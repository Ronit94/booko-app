import React, { useState } from 'react';
import { Card,Row, Col,Form, Input, Button ,Typography,Spin  } from 'antd';
import {  UserOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import logo from '../../logo.png'
const { Title,Paragraph,Text } = Typography;

function ForgotPasswordComponent() {
  let [loading, setLoading] = useState(false);

  const onFinish = values => {
    setLoading(true)
    console.log('Success:', values);
  };
  
  return (
    <Card id="login">
    <Row>
    <Col span={12} className="form-box">
      <img src={logo} className="logo" alt="logo"/>
    </Col>
    <Col span={12} className="form-box">
      <Spin spinning={loading}>
    <Paragraph style={{marginLeft:20}}>
      <Title level={2}>Forgot Password</Title>
      <Text>Please enter your register email id to get password</Text>
      </Paragraph>
      <Form
name="normal_login"
className="login-form"
initialValues={{ remember: true }}
onFinish={onFinish} style={{marginLeft:20}}
>
<Form.Item
  name="username"
  rules={[{ required: true, message: 'Please input your Username!' }]}
>
  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
</Form.Item>
<Form.Item>
  <Button  shape="round" htmlType="submit" style={{textAlign:"center"}}>
    Send Password
  </Button>
  <Link to="/login" style={{float:'right'}}>
    Login
  </Link>
</Form.Item>
</Form>
    </Spin>
    </Col>
    </Row>
  </Card>
  );
}

export default ForgotPasswordComponent
