import React from 'react';
import { useSelector} from 'react-redux';
import {userinfo} from '../../../../features/user/userState';
import {Statistic,Row,Col,Descriptions,Divider,Badge} from 'antd';
import { UserOutlined, ProjectOutlined, StarOutlined,TeamOutlined} from '@ant-design/icons';
function OverviewComponent() {
  let userData = useSelector(userinfo)
    return (
      <>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Students" value={userData.students} prefix={<UserOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Projects" value={userData.projects} prefix={<ProjectOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Followers" value={userData.followers} prefix={ <TeamOutlined />} />
        </Col>
        <Col span={6}>
          <Statistic title="Stars" value={userData.stars} prefix={<StarOutlined />} />
        </Col>
      </Row>
      <Divider/>
      <Row>
        <Descriptions
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="Product">EduCare Application</Descriptions.Item>
        <Descriptions.Item label="Active"> <Badge status="processing" text="Running" /></Descriptions.Item>
        <Descriptions.Item label="Created At">{userData.createdAt ? new Date(userData.createdAt).toLocaleString() : new Date().toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Application Info">
          It is an application
          <br />
          which version 0.1
          <br />
          College Student tracking application
          <br />
         
        </Descriptions.Item>
      </Descriptions>
      </Row>
      </>
      );
}


export default OverviewComponent