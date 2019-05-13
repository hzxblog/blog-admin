import React, { Component } from "react";
import { connect } from 'react-redux';
import styles from "./index.less";
import { Menu, Dropdown, Icon } from 'antd';
import { updateUsername } from "../../store/actions/user";

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsername: (username) => {
      dispatch(updateUsername(username));
    }
  }
};

@connect(
  state => ({ user: state.userReducer }),
  mapDispatchToProps
)
class HeaderNav extends Component {

  logout = () => {
    const { history } = this.props;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    history.push("/auth/login");
  };

  onClickMenuItem = ({ item, key, keyPath }) => {
    const actions = {
      logout: this.logout
    };
    actions[key]();
  };

  render() {
    const { user: { username } } = this.props;
    const menu = (
      <Menu onClick={this.onClickMenuItem}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles["main"]}>
        <div className={styles["header-right"]}>
          <Dropdown overlay={menu} placement="bottomRight">
            <span className={styles["ant-dropdown-link"]}>
              {username} <Icon type="down" />
            </span>
          </Dropdown>,
        </div>
      </div>
    )
  }
}

export default HeaderNav;
