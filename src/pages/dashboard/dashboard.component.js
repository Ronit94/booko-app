import React,{useState,useEffect} from 'react';
import {  useDispatch,useSelector } from 'react-redux';
import {Switch, withRouter,Route} from 'react-router-dom';
import {RouteWithSubRoutes} from '../../app/config';
import { Layout,Menu,Spin,Dropdown} from 'antd';
import { Link,useHistory } from "react-router-dom";
import { UserOutlined,TeamOutlined,SettingOutlined,LogoutOutlined} from '@ant-design/icons';
import PageNotFoundComponent from '../exceptions/pagenotfound.component';
import {AuthService,CommonServices} from '../../providers/services';
import {setUserData,userLogin,userinfo} from '../../features/user/userState';
import booko from '../../booko_logo.svg';

const { Sider,Header,Footer,Content } = Layout;
const { SubMenu } = Menu;

function DashboardComponent({ routes }) {
  const menu = (
    <Menu>
    <Menu.Item key="0">
     <Link to="/dashboard/profile">
     <UserOutlined /> User Profile
     </Link>
    </Menu.Item>
    <Menu.Item key="1">
    <Link to="/dashboard/settings">
    <SettingOutlined /> User Settings
     </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" onClick={userLogOut}> {/** Here you invoking your desired function as method of this, and this in that function will be set to object from that function is called ie: your component object */}
    <LogoutOutlined /> Logout  
    </Menu.Item>
  </Menu>
  );
  
  let [user, setProfile] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(userinfo)
  let pathname = window.location.pathname
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

  if(Object.keys(userData).length!==0){
    user = userData
  }

  return (

    <Layout style={{height:'-webkit-fill-available'}} >
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
          }}
          onCollapse={(collapsed, type) => {
            dispatch(userLogin())
            console.log(collapsed, type);
          }}
        >
          <div id="logo">
            <img src={booko} height={30} width={200} alt="Logo"/>
          </div>
          <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark">
            <Menu.Item key="1" icon={<UserOutlined />} isSelected={pathname==='/dashboard/analytics' ? true : false}>
              <Link to="/dashboard/analytics">Analytics</Link>
            </Menu.Item>
            <SubMenu key="2" icon={<TeamOutlined />} title="Students">
              <Menu.Item key="3" isSelected={pathname==='/dashboard/students' ? true : false}><Link to="/dashboard/students/add">Add Students</Link></Menu.Item>
              <Menu.Item key="4" isSelected={pathname==='/dashboard/students' ? true : false}><Link to="/dashboard/students/list">Students List</Link></Menu.Item>
            </SubMenu>
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
                        <img src={user.meta.profilePicture ? user.meta.profilePicture : 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'} alt="profile" className="profile-pic"/> {user.AdminName}
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
          <Content>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 600 }}>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
              <Route component={PageNotFoundComponent}/>
            </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Educare created by Ronit Sarma</Footer>
        </Layout>
      </Layout>
  );
}


export default withRouter(DashboardComponent)