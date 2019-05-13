import React, { Component } from 'react';
import { getByIdArticle, getTags, updateArticle, createArticle  } from "../../request";
import { Form, Input, Select, Button, Switch, message  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

class ArticleEdit extends Component {

  state = {
    types: [],
    id: ''
  };


  getArticleType() {
    getTags().then(res => {
      this.setState({
        types: res.data.results
      });
    })
  }

  getArticle(id) {
    getByIdArticle(id).then(res => {
      const data = res.data;
      this.props.form.setFieldsValue({
        title: data.title,
        is_publish: data.is_publish,
        tag: data.tag,
        content: data.content
      });
    })
  }

  handleSubmit = (e) => {
    const { id } = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let request = null;
        if (id) {
          request = updateArticle(id, values);
        } else {
          request = createArticle(values);
        }
        request.then(res => {
          if (id) {
            // this.props.history.goBack();
            message.success('修改成功');
          } else {
            message.success('添加成功');
          }
        })
      }
    });
  };

  componentDidMount() {
    this.getArticleType();
    const { match } = this.props;
    const id = match.params.id;
    if (id) {
      this.setState({
        id: id
      });
      this.getArticle(id);
    }
  }

  render() {
    const { types } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 2,
        },
      },
    };
    const typeOption = types.map(type => (
      <Option value={type.name} key={type._id}>{type.name}</Option>
    ));
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请填写文章标题!',
              }],
            })(
              <Input placeholder="文章标题" style={{ width: 400 }}/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="标签">
            {getFieldDecorator('tag', {
              rules: [{
                required: true, message: '请选择文章标签!',
              }],
            })(
              <Select style={{ width: 200 }} placeholder="文章标签">
                {typeOption}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="内容">
            {getFieldDecorator('content')(
              <TextArea rows={10} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否发表"
          >
            {getFieldDecorator('is_publish', { valuePropName: 'checked' })(
              <Switch />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button type="primary" onClick={() => { this.props.history.goBack() }} style={{ marginLeft: "10px" }}>取消</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(ArticleEdit);
