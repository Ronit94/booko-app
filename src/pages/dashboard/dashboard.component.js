import React,{useState,useEffect} from 'react';
import {  useDispatch } from 'react-redux';
import {Switch, withRouter,Route} from 'react-router-dom';
import {RouteWithSubRoutes} from '../../app/config';
import { Layout,Menu,Spin,Dropdown} from 'antd';
import { Link,useHistory } from "react-router-dom";
import { UserOutlined,VideoCameraOutlined,UploadOutlined,SettingOutlined,LogoutOutlined} from '@ant-design/icons';
import PageNotFoundComponent from '../exceptions/pagenotfound.component';
import {AuthService,CommonServices} from '../../providers/services';
import {setUserData} from '../../features/user/userState';
import booko from '../../booko_logo.svg';

const { Sider,Header,Footer,Content } = Layout;







function DashboardComponent({ routes }) {
  const menu = (
    <Menu>
    <Menu.Item key="0" icon={<UserOutlined />}>
     <Link to="/dashboard/profile">
       User Profile
     </Link>
    </Menu.Item>
    <Menu.Item key="1" icon={<SettingOutlined />}>
    <Link to="/dashboard/settings">
      User Settings
     </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" icon={<LogoutOutlined />} onClick={userLogOut}> {/** Here you invoking your desired function as method of this, and this in that function will be set to object from that function is called ie: your component object */}
      Logout  
    </Menu.Item>
  </Menu>
  );
  
  let [user, setProfile] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    CommonServices.commonHttpGetServer('admin/fetch-admin-data').then((res)=>{
      if(res.status===200){
        dispatch(setUserData(res.responseData))
        setProfile(res.responseData)
      }
    })
    return () => {
      
    };
  }, [dispatch]);

  function userLogOut(){
    AuthService.deleteAuthToken()
    history.replace('/')
  }



  return (

    <Layout style={{height:'-webkit-fill-available'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div id="logo">
            <img src={booko} height={30} width={200} alt="Logo"/>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/dashboard/analytics">Analytics</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              nav 4
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
          <div style={{float:'right',paddingRight:30}}>
          <Dropdown overlay={menu}>
           {(() => {
            if (user!==undefined && user.meta) {
              return (
                <div  onClick={e => e.preventDefault()}>
                  <img src={user.meta.ProfilePicture ? user.meta.ProfilePicture : 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'} alt="profile" height={20} width={20}/> {user.AdminName}
                </div>
              )
            } else {
              return (
                <div>
                    <Spin />
                </div>
              )
            }
          })()}
        </Dropdown>
          </div>
      </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 600 }}>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
              <Route component={PageNotFoundComponent}/>
            </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Booko App created by Ronit Sarma</Footer>
        </Layout>
      </Layout>
  );
}


export default withRouter(DashboardComponent)