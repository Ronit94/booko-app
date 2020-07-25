import React, { useState } from 'react';
import { Row,Col,Form,Input,Button,InputNumber, Skeleton } from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import {userinfo} from '../../../../features/user/userState';
import {useSelector} from 'react-redux';
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };





function BasicSettings(){
    let userData = useSelector(userinfo)
    let [imgloading,setimg] =useState(false) 
    const onFinish = values => {
        console.log(values);
    };

    function imgUpload(){
        setimg(true)
    }
    return (
       <Row>
           <Col span={12}>
           <Form {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
           </Col>
           <Col span={12}>
           </Col>
       </Row>
    )
}

export default BasicSettings