import Axios from 'axios';
import config from '../config';

export default function(data) {
  return Axios.post(`${config.baseUrl}/api/auth/login`, data)
}
