import React, { useState } from 'react';
import { Row,Col,Form,Input,Button,InputNumber,Select,DatePicker,Skeleton,message,Spin} from 'antd';
import {useSelector,useDispatch} from 'react-redux';
import {userinfo,setUserData} from '../../../../features/user/userState';
import {CommonServices} from '../../../../providers/services'
const {Option} = Select
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


function BasicSettings(){

    const userData = useSelector(userinfo);
    const dispatch = useDispatch();
    const [loading,isloading] = useState(false)

    let user = JSON.parse(JSON.stringify(userData))



    const onFinish = values => {
        
        if(values.AdminName){
          user.AdminName = values.AdminName
        }

        if(values.Age){
          user.meta.Age = values.Age
        }
         if(values.dob){
           user.meta.dob = values.dob.format('YYYY-MM-DD')
         }

         user.Designation = values.Designation
         user.meta.Address = values.Address

         isloading(true)

         CommonServices.commonHttpPatchServer('admin/update',user).then((res)=>{
           if(res.status===200){
            message.success(res.responseText)
            dispatch(setUserData(user))
           }else{
             message.error(res.responseText)
           }
           isloading(false)
         })
    };


    return (
       <Row>
           <Col span={12}>
          {(() => {

            if(Object.keys(user).length!==0){
              return(
                      <Spin spinning={loading}>
                      <Form {...layout} name="nest-messages" onFinish={onFinish}>
                      <Form.Item
                        name="AdminName"
                        label="Name"
                      >
                      <Input value={user.AdminName} />
                      </Form.Item>

                    <Form.Item
                      name="Age"
                      label="Age"
                      rules={[
                        {
                          type: 'number',
                          min: 25,
                          max: 99,
                        },
                      ]}
                    >
                      <InputNumber value={user.meta.Age} />
                    </Form.Item>

                    <Form.Item name="dob" label="DatePicker">
                    <DatePicker value={user.dob} />
                  </Form.Item>

                  <Form.Item
                    name="Designation"
                    label="Select"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Your designation is required !',
                      },
                    ]}
                  >
                    <Select placeholder="Please select your designation" value={user.Designation}>
                      <Option value="Principle">Principle</Option>
                      <Option value="Secretary">Secretary</Option>
                      <Option value="Teacher">Teacher</Option>
                    </Select>
                  </Form.Item>

                  
                  <Form.Item name="Address" label="Address" rules={[
                      {
                        required: true,
                        message: 'Your address is required !',
                      },
                    ]}>
                    <Input.TextArea value={user.Address} />
                  </Form.Item>
                  <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                </Spin>
              )
            }else{
              return (

                <Skeleton active={true}></Skeleton>
              )
            }


          })()}
           </Col>
           <Col span={12}>
           </Col>
       </Row>
    )
}

export default BasicSettings