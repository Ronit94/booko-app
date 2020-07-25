import React from 'react';
import {Col,Row,Skeleton,Divider,Typography, Card,Tabs} from 'antd';
import { useSelector} from 'react-redux';
import {userinfo} from '../../../features/user/userState';
import OverviewComponent from './contents/overview';
import ProjectComponent from './contents/projects';
import FollowersComponent from './contents/followers';
import { UserOutlined,KeyOutlined, PhoneOutlined, BankOutlined, SettingOutlined,AuditOutlined,GlobalOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;


export function ProfileComponent() {
  let userData = useSelector(userinfo)
  let loading = false
  if(Object.keys(userData).length===0){
    loading = true
  }
    return (
        <Row>
          <Col span={6} style={{paddingRight: 10}} className="form-box">
            <Card bordered={false}>
            <>
          {(() => {
            if (userData!==undefined && userData.meta) {
              return (
                <div  onClick={e => e.preventDefault()}>
                  <img src={userData.meta.ProfilePicture ? userData.meta.ProfilePicture : 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'} alt="profile" className="user-profile"/>
                  <Divider> <Title level={4}>Personal Information</Title></Divider>
                  <Paragraph>
                    <p><KeyOutlined/> {userData.AdminEmail}</p>
                    <p><UserOutlined /> {userData.AdminName}</p>
                    <p><PhoneOutlined  /> {userData.Mobile}</p>
                    <p><AuditOutlined />{userData.meta.address ? userData.meta.address : ' Address is not present' } <Link to="/dashboard/settings"><SettingOutlined /></Link></p>
                    <Divider/>
                      <p><BankOutlined/> {userData.CollegeName}</p>
                      <p><GlobalOutlined /> {userData.CollegeState}</p>
                  </Paragraph>
                </div>
              )
            } else {
              return (
                <div>
                    <Skeleton active={true} />
                </div>
              )
            }
          })()}
          </>
          </Card>
          </Col>
          <Col span={18} className="form-box">
            <Card bordered={false} loading={loading}>
            <>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Overview" key="1">
                <OverviewComponent/>
              </TabPane>
              <TabPane tab="Projects" key="2">
                <ProjectComponent />
              </TabPane>
              <TabPane tab="Followers" key="3">
                <FollowersComponent />
              </TabPane>
            </Tabs>
            </>
            </Card>
          </Col>
        </Row>
      );
}
