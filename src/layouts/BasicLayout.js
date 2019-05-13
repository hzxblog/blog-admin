import React  from 'react';
import { Layout } from "antd";
import { Switch, Route } from 'react-router-dom';
import SideMenu from "../components/SideMenu";
import HeaderNav from "../components/HeaderNav";
import { basicRoutes } from "../route";

const { Sider, Header, Footer, Content } = Layout;

const BasicLayout = (props) => (
  <Layout>
    <Sider width={ 250 } style={{
      overflow: 'auto', height: '100vh', position: 'fixed', left: 0
    }}
    >
      <h2 className="header"
          style={{ height: '64px', lineHeight: '64px', textAlign: 'center', color: '#fff', margin: 0 }}>
        博客后台管理
      </h2>
      <SideMenu {...props}/>
    </Sider>
    <Layout style={{ marginLeft: 250, minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        <HeaderNav {...props}/>
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff' }}>
          <Switch>
            {
              basicRoutes.map(route => (
                <Route path={route.path} component={route.component} exact={route.exact} key={route.path}/>
              ))
            }
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Copyright © 2018 韩志雄的后台 <a href="http://www.beian.miit.gov.cn" rel="noopener">鄂ICP备18003305号-1</a>
      </Footer>
    </Layout>
  </Layout>
);

export default BasicLayout;
