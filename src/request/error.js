import { message } from "antd";

const errMsg = {
  411(msg) {
    message.warning(msg, 2);
  }
};

const errAction = function (err) {
  if (err.response) {
    const data = err.response.data;
    errMsg[data.code](data.msg);
  }
};

export default errAction;