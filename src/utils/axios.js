import Axios from 'axios';
import config from '../config';

const axios = Axios.create({
  baseURL: config.baseUrl
});

axios.interceptors.request.use(function (config) {
  const Authorization = localStorage.token;
  if (Authorization) {
    config.headers.Authorization = Authorization;
    return config;
  }
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export default axios;
