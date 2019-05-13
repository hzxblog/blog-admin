import React, { Component } from 'react';
import { getTags, deleteTags, createTag, updateTag } from "../../request";
import { Table, Divider, Icon, Button, Modal, Form, Input, Popconfirm, message } from 'antd';

const FormItem = Form.Item;

@Form.create()
class ArticleTags extends Component{

  state = {
    types: [],
    visible: false,
    loading: false,
    method: 'post',
    id: ''
  };

  componentDidMount() {
    this.getTypes();
  }

  getTypes() {
    getTags().then(res => {
        this.setState({
          types: res.data.results
        });
      })
  }

  edit(record){
    this.props.form.setFieldsValue({
      name: record.name
    });
    this.setState({
      visible: true,
      method: 'patch',
      id: record._id
    });
  };


  addType = () => {
    this.props.form.setFieldsValue({
      name: ""
    });
    this.setState({
      visible: true,
      method: 'post'
    });
  };


  delete = (record) => {
    deleteTags(record._id)
      .then(() => {
      this.getTypes();
    })
  };

  handleSubmit = (e) => {
    const { method, id } = this.state;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (method === "patch") {
          await updateTag(id, values);
        } else {
          await createTag(values);
        }
        this.setState({
          visible: false
        });
        message.success('提交成功');
        this.getTypes();
      }
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { types, visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (text, record) => (
          <span>
            <Icon type="edit" onClick={() => this.edit(record)} style={{ cursor: "pointer" }}/>
            <Divider type="vertical" />
             <Popconfirm title="确认删除该选项吗?" onConfirm={() => this.delete(record)} okText="是" cancelText="否">
               <Icon type="delete" style={{ cursor: "pointer" }}/>
             </Popconfirm>
          </span>
        ),
      }
    ];

    return (
      <div>
        <div style={{ marginBottom: '10px' }}>
          <Button type="primary" onClick={this.addType}>添加</Button>
        </div>
        <Table dataSource={types} columns={columns} rowKey="name" bordered/>

        <Modal
          visible={visible}
          title="标签"
          onOk={this.save}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写名称!' }],
              })(
                <Input placeholder="填写名称" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" loading={loading}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Modal>

      </div>
    );
  }
}

export default ArticleTags;
