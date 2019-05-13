import React, { Component } from 'react';
import { getArticleMenu, deleteArticle } from "../../request";
import {List, Icon, Button, Pagination, Popconfirm} from 'antd';
import { Link } from 'react-router-dom';
import { searchToObject } from "../../utils";
// import markdown from "../../utils/markdown";

const moment = require('moment');

class Article extends Component{

  state = {
    articles: [],
    total: 1,
    loading: false,
    currentPage: 1
  };

  onChange = (pageNumber) => {
    const { history } = this.props;
    this.setState({ currentPage: pageNumber });
    history.push(`/article?page=${pageNumber}`);
    this.getArticles({ page: pageNumber});
  };

  delete = (id) => {
    deleteArticle(id).then(res => {
      this.getArticles();
    })
  };

  componentDidMount() {
    const { location: { search } } = this.props;
    const currentSearch = searchToObject(search);
    if (currentSearch.page) this.setState({ currentPage: Number(currentSearch.page) });
    this.getArticles(currentSearch);
  }

  getArticles(query = {}) {
    this.setState({
      loading: true
    });
    getArticleMenu(query).then(res => {
      this.setState({
        articles: res.data.results,
        total: res.data.count,
        loading: false
      })
    })
  }

  addArticle = () => {
    const { history } = this.props;
    history.push(`/article/edit`);
  };

  render() {
    const { articles, total, loading, currentPage } = this.state;
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    return (
      <div>
        <div style={{ marginBottom: '15px' }}>
          <Button type="primary" onClick={this.addArticle}>添加</Button>
        </div>
        <List
          itemLayout="vertical"
          size="small"
          loading={loading}
          dataSource={articles}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={
                [
                  <IconText type="eye" text={ item.watcher } />,
                  <IconText type="clock" text={ moment(item.created_time).format('YYYY-MM-DD') } />,
                  <Link to={'/article/edit/' + item._id }><Icon type="edit" /></Link>,
                  <Popconfirm title="确认删除该选项吗?" onConfirm={() => this.delete(item._id) } okText="是" cancelText="否">
                    <Icon type="delete" theme="twoTone" style={{ cursor: "pointer" }}/>
                  </Popconfirm>
                ]
              }
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
              />
            </List.Item>
          )}
        />
        <div style={{ marginTop: "15px", float: "right" }}>
          <Pagination showQuickJumper current={currentPage} total={total} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default Article;
