import axios from "../utils/axios";
import {
  tagUrl,
  articleMenuUrl,
  articleUrl,
  userUrl,
  attachmentListUrl,
  attachmentUrl,
}  from "./api";

export const changePassword = data => axios({
  url: '/api/auth/change-password',
  data,
  method: 'post'
});

// 标签
export const getTags = (params = {}) => axios({
  url: tagUrl,
  params
});

export const createTag = data => axios({
  url: tagUrl,
  data,
  method: 'post'
});

export const updateTag = (id, data) => axios({
  url: `${tagUrl}/${id}`,
  data,
  method: 'patch'
});
export const deleteTags = id => axios({
  method: 'delete',
  url: `${tagUrl}/${id}`
});

// 文章
export const getArticleMenu = (params = {}) => axios({
  url: articleMenuUrl,
  params
});

export const deleteArticle = id => axios({
  method: 'delete',
  url: `${articleUrl}/${id}`
});

export const getByIdArticle = id => axios({
  url: `${articleUrl}/${id}`
});

export const createArticle = data => axios({
  url: articleUrl,
  data,
  method: 'post'
});

export const updateArticle = (id, data) => axios({
  url: `${articleUrl}/${id}`,
  data,
  method: 'patch'
});

// 用户
export const getUsers = (params = {}) => axios({
  url: userUrl,
  params
});

export const deleteUser = id => axios({
  method: 'delete',
  url: `${userUrl}/${id}`
});

export const createUser = data => axios({
  url: userUrl,
  data,
  method: 'post'
});

export const updateUser = (id, data) => axios({
  url: `${userUrl}/${id}`,
  data,
  method: 'patch'
});

export const getDirList = () => axios(attachmentListUrl);
export const deleteFile = (path) => axios({
  method: 'delete',
  url: `${attachmentUrl}?file=${path}`
});
