import React, { Component } from "react";
import { Icon, Menu } from "antd";
import menus from "./menus";

const SubMenu = Menu.SubMenu;

class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
      selectedKeys: [],
      menus: menus
    };
  }

  jumpRoute({ item, key }) {
    const { history } = this.props;
    this.setState({
      selectedKeys: [key],
    });
    history.push(`/${key}`);
  }

  setDefaultMenu(key) {
    let keys = key.split('/');
    this.setState({
      selectedKeys: [key],
      openKeys: [keys[0]]
    });
  }

  componentWillMount() {
    const { location } = this.props;
    const pathname = location.pathname;
    this.setDefaultMenu(pathname.substr(1));
  }

  render() {
    const { openKeys, selectedKeys, menus } = this.state;
    const setMenu = (menus) => {
      return menus.map(menu => {
        if (menu.children) {
          return (
            <SubMenu key={menu.key} title={
              <span><Icon type={menu.icon} /><span>{menu.title}</span></span>
            }>
              {setMenu(menu.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={menu.key}>
              { menu.icon ? <Icon type={menu.icon} /> : "" }
              <span>{menu.title}</span>
            </Menu.Item>
          )
        }
      })
    };

    return (
      <Menu
        theme="dark"
        mode="inline"
        onClick={({ item, key }) => this.jumpRoute({ item, key })}
        defaultOpenKeys={openKeys}
        selectedKeys={selectedKeys}>
        {setMenu(menus)}
      </Menu>
    )
  }
}

export default SideMenu;
