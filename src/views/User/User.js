import React, { Component } from 'react';
import { getUsers, updateUser, changePassword } from "../../request";
import {
  Button,
  Form,
  Input,
  Tabs,
  Row,
  Avatar,
  Col,
  Icon, message
} from 'antd';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@Form.create()
class ArticleType extends Component{

  state = {
    user: null,
    visible: false,
    loading: false,
    method: 'post',
    id: ''
  };

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    this.setState({
      loading: true
    });
    getUsers().then(res => {
      const data = res.data;
      this.setState({
        user: data,
        loading: false
      });
      this.props.form.setFieldsValue({
        name: data.name,
        age: data.age,
        address: data.address,
        email: data.email,
        phone: data.phone,
        work_years: data.work_years,
      });
    }).catch(() => {
      this.setState({
        loading: false
      });
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        const { user } = this.state;
        updateUser(user._id, values).then(res => {
          this.setState({
            loading: false
          });
          message.success('更新信息成功');
          this.getUser();
        }).catch(() => {
          this.setState({
            loading: false
          });
        })
      }
    });
  };

  changePassword = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });
        changePassword(values).then(res => {
          this.setState({
            loading: false
          });
          message.success('修改密码成功');
          this.getUser();
        }).catch(() => {
          this.setState({
            loading: false
          });
        })
      }
    });
  };

  changeVisible = () =>{
    this.setState({
      visible: !this.state.visible
    })
  };

  render() {
    const { loading, visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelcol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrappercol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return (
      <div>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{ minHeight: 220 }}
        >
          <TabPane tab="基本设置" key="1">
            <h2>基本设置</h2>
            <Row>
              <Col span={7}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <FormItem label="姓名">
                    {getFieldDecorator('name')(
                      <Input placeholder="请填写姓名" />
                    )}
                  </FormItem>
                  <FormItem label="年龄">
                    {getFieldDecorator('age')(
                      <Input placeholder="请填写年龄" type="number"/>
                    )}
                  </FormItem>
                  <FormItem label="电话">
                    {getFieldDecorator('phone')(
                      <Input placeholder="请填写电话" type="phone"/>
                    )}
                  </FormItem>
                  <FormItem label="住址">
                    {getFieldDecorator('address')(
                      <Input placeholder="请填写住址"/>
                    )}
                  </FormItem>
                  <FormItem label="邮箱">
                    {getFieldDecorator('email')(
                      <Input placeholder="请填写邮箱"/>
                    )}
                  </FormItem>
                  <FormItem label="工作经验">
                    {getFieldDecorator('work_years')(
                      <Input placeholder="请填写工作经验" type="number"/>
                    )}
                  </FormItem>
                  <FormItem
                    wrapperCol={{
                      xs: { span: 24, offset: 0 }
                    }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      更新基本信息
                    </Button>
                  </FormItem>
                </Form>
              </Col>
              <Col span={8} offset={2}>
                <h4>头像</h4>
                <div style={{ padding: '15px' }}>
                  <Avatar size={ 90 } icon="user" />
                </div>
                <div>
                  <Button>
                    <Icon type="upload" /> 上传头像
                  </Button>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="密码设置" key="2">
            <h2>密码设置</h2>
            <Row>
              <Col span={7}>
                <Form {...formItemLayout} onSubmit={this.changePassword}>
                  <FormItem label="原密码">
                    {getFieldDecorator('password', {
                      rules: [ {
                        required: true, message: '请填写密码',
                      }],
                    })(
                      <Input placeholder="请填写原密码" type={ visible ? 'text' : 'password' }/>
                    )}
                  </FormItem>
                  <FormItem label="新密码">
                    {getFieldDecorator('newPassword', {
                      rules: [ {
                        required: true, message: '请填写新密码',
                      }],
                    })(
                      <Input placeholder="请填写新密码" type={ visible ? 'text' : 'password' }/>
                    )}
                  </FormItem>
                  <FormItem label="确认新密码">
                    {getFieldDecorator('confirmPassword', {
                      rules: [ {
                        required: true, message: '请确认密码',
                      }],
                    })(
                      <Input placeholder="请确认新密码" type={ visible ? 'text' : 'password' }/>
                    )}
                  </FormItem>
                  <FormItem
                    wrapperCol={{
                      xs: { span: 24, offset: 0 }
                    }}>
                    <Button.Group>
                      <Button type="primary" htmlType="submit" loading={loading}>
                        修改密码
                      </Button>
                      <Button type="primary" icon={ visible ? 'eye' : 'eye-invisible' } onClick={ this.changeVisible }/>
                    </Button.Group>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ArticleType;
