import React, { useState,useEffect } from 'react';
import { Card,Row, Col,Form, Input, Button,Select ,Typography,Space,Spin,message  } from 'antd';
import {  UserOutlined, LockOutlined,KeyOutlined,MobileOutlined} from '@ant-design/icons';
import {CommonServices} from '../../providers/services';
import { Link } from "react-router-dom";
import logo from '../../logo.png'
const { Title,Paragraph,Text } = Typography;
const {Option} = Select

export function RegistrationComponent() {
  let [loading, setLoading] = useState(false);
  let [colleges,setCollegeData] = useState([])
  let [states,setState] = useState([])

  function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  useEffect(() => {
    setLoading(true)
    CommonServices.commonHttpGetServer('core/fetch-college-data').then((res)=>{
      if(res.status===200){
        setCollegeData(res.responseData.colleges)
        setState(res.responseData.state)
        setLoading(false)
      }
    })
    return () => {
       
    };
  }, []);

  const onFinish = values => {
    setLoading(true)
    CommonServices.commonHttpPostServer('admin/signup',values).then((res)=>{
      if(res.status===200){
        message.success(res.responseText)
      }else{
        message.warning(res.responseText)
      }
      setLoading(false)
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
      <Title level={2}>Register User</Title>
      <Text>Please register with your personal data</Text>
      </Paragraph>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish} style={{marginLeft:20}}
      >

      <Form.Item
        name="fullname"
        rules={[{ required: true, message: 'Please input your fullname!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Fullname" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' },{type:"email",message:'Please enter email id'}]}
      >
        <Input type="email" prefix={<KeyOutlined />} placeholder="Email" />
      </Form.Item>

      <Input.Group compact>
        <Select style={{ width: '20%' }} defaultValue="+91">
          <Option value="+91">+91</Option>
        </Select>
        <Form.Item
        name="mobile"
        rules={[{ required: true, message: 'Please input your mobile!' }]}
      >
        <Input style={{ width: '80%' }} prefix={<MobileOutlined />} placeholder="Mobile number" />
        </Form.Item>
      </Input.Group>
      <Form.Item name="college"  rules={[{ required: true, message: 'Please input your college!' }]}>
      <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a Colleges"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
         {colleges.map(d => (
          <Option key={d}>{d}</Option>
        ))}
        </Select>
      </Form.Item>
      <Form.Item name="state"  rules={[{ required: true, message: 'Please input your state!' }]}>
      <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a Colleges"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
         {states.map(d => (
          <Option key={d}>{d}</Option>
        ))}
        </Select>
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
        <Space size={10}>
        <Button type="primary" shape="round" htmlType="submit" block>
          Signup
        </Button>
        <Button type="dashed" shape="round"  className="login-form-button" block>
          <Link to="/login"> Login</Link>
        </Button>
        </Space>
      </Form.Item>
      </Form>
      </Spin>
          </Col>
          </Row>
        </Card>
  );
}
