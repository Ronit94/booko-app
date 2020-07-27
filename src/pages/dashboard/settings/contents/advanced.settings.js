import React,{useState} from 'react';

import { Drawer, Form, Button, Input,List, Divider,message } from 'antd';

import NumericInput from '../../../../providers/pipes/number.pipe';

import {CommonServices} from '../../../../providers/services/common.service';


const data = [
    {
      title: 'Account Password',
      description:"Change the password"
    },
    {
      title: 'Security Phone',
      description :"Update your security phone"
    },
    {
      title : "Security Questions",
      description : "Add or modify security question"
    },
    {
      title: 'Backup Email',
      description : "Backup your email"
    },
  ];

function AdvanceSettings(){

  let[visible,chngVisible] = useState(false)

  const showDrawer = () => {
    chngVisible(true)
  };

  const onClose = () => {
    chngVisible(false)
  };

  const onFinish = values=>{
    CommonServices.commonHttpPostServer('admin/security',values).then((res)=>{
      if(res.status===200){
        message.success(res.responseText)
        chngVisible(false)
      }else{
        message.warning(res.responseText)
        chngVisible(false)
      }
    })
  }

    return (
      <>
        <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item  actions={[<Button type="link" onClick={showDrawer}>Edit</Button>]}>
        <List.Item.Meta 
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
   <Drawer
          title="Security Settings"
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form layout="vertical" hideRequiredMark onFinish={onFinish}>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Divider orientation="center">Security Phone Number</Divider>
      <Form.Item name="security_no" label="Security Phone number">
        <NumericInput/>
      </Form.Item>
      <Divider orientation="center">Security Questions</Divider>
      <Form.Item
        name="security1"
        label="Your first school name"
        rules={[
          {
            required: true,
            message: 'Please input your questions!',
          },
        ]}
      >
        <Input />
        </Form.Item>

        <Form.Item
        name="security2"
        label="Your mother's maternal name"
        rules={[
          {
            required: true,
            message: 'Please input your questions!',
          },
        ]}
      >
        <Input />
        </Form.Item>
        <Divider orientation="center">Backup Email</Divider>
        <Form.Item
        name="backupEmail"
        label="Your Backup email"
        rules={[
          {
            required: true,
            message: 'Please input your email id!',
          },
        ]}
      >
        <Input type="email" />
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" block style={{width:"30%",float:"right"}}>
          Submit
        </Button>
      </Form.Item>

    </Form>
</Drawer>
  </>
    )
}

export default AdvanceSettings