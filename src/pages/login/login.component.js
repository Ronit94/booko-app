import React, { useState,useEffect,useRef } from 'react';
import { Card,Row, Col,Form, Input, Button, Checkbox,Typography,Space,Spin,message  } from 'antd';
import {  UserOutlined, LockOutlined,LoginOutlined,FacebookOutlined,GoogleOutlined,GithubOutlined} from '@ant-design/icons';
import { Link,useHistory, withRouter } from "react-router-dom";
import {AuthService,CommonServices} from '../../providers/services';
import {setConfigToken} from '../../app/config';
import logo from '../../logo.png';
const { Title,Paragraph,Text } = Typography;



function LoginComponent() {
  const isCancelled = useRef(false);
  let [loading, setLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    return () => {
       isCancelled.current = true
    };
  }, []);

  const onFinish = values => {
     setLoading(true)
     CommonServices.commonHttpPostServer('admin/login',values).then((res)=>{
       if(!isCancelled.current){
        setLoading(false)
        if(res.status!==200){
          message.error(res.responseText)
        }else{
         AuthService.setAuthToken(JSON.stringify(res.responseData)).then((res)=>{
           if(res){
             setConfigToken()
              history.replace('/')
           }
         })
         message.success(res.responseText)
        }
       }
     })
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
      <Title level={2}>Welcome User (:</Title>
      <Text>To keep connected us please login with your personal information by email id and password</Text>
      </Paragraph>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish} style={{marginLeft:20}}
      >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' },{type:"email",message:'Please enter email id'}]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link to="/forgot-password" style={{float:'right'}}>
          Forgot password
        </Link>
      </Form.Item>
      <Form.Item>
        <Space size={10}>
          <Button type="primary"  shape="round" htmlType="submit" className="login-form-button"  icon={<LoginOutlined />}>
            Log in
          </Button>
          <Button type="default"  shape="round" >
            <Link to="/signup">Signup</Link>
          </Button>
        </Space>
      </Form.Item>
      <Form.Item>
      Or login using - 
        <Space size={10}>
          <Button type="dashed" shape="circle" icon={<FacebookOutlined />} />
          <Button type="dashed" shape="circle" icon={<GoogleOutlined />} />
          <Button type="dashed" shape="circle" icon={<GithubOutlined />} />
        </Space>
      </Form.Item>
    </Form>
    </Spin>
    </Col>
    </Row>
  </Card>
  );
}


export default withRouter(LoginComponent)