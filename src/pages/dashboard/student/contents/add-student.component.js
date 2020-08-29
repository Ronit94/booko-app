import React,{useState} from 'react';
import { Form, Input, Button,Select,Descriptions, Spin,message,Card } from 'antd';
import NumericInput from '../../../../providers/pipes/number.pipe';
import {useDispatch,useSelector} from 'react-redux';
import {setUserData,userinfo} from '../../../../features/user/userState';
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

function AddStudentComponent(props) {
  let userData = useSelector(userinfo);
  let admin = JSON.parse(JSON.stringify(userData))
  const onFinish = values => {
      setLoading(true)
      CommonServices.commonHttpPostServer('admin/add-student',values).then((res)=>{
        if(res.status===200){
            //props.callbackParent(true)
            message.success(res.responseText)
        }else{
            message.warning(res.responseText)
        }
        admin.students+=1
        dispatch(setUserData(admin))
        setLoading(false)
      })
  };

  let [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  let [YearArray,Year] = [[],new Date().getFullYear()]

  for(let i = Year; i < Year+4;i++){
      YearArray.push(i)
  }


  return (
      <>
      <Card loading={Object.keys(admin).length===0 ? true : false}>
       <Descriptions title="College Info" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
        <Descriptions.Item label="Admin Name">{admin.AdminName}</Descriptions.Item>
        <Descriptions.Item label="Students Count">{admin.students}</Descriptions.Item>
        <Descriptions.Item label="Admin Email">{admin.AdminEmail}</Descriptions.Item>
        <Descriptions.Item label="College Name">{admin.CollegeName}</Descriptions.Item>
        <Descriptions.Item label="State">{admin.CollegeState}</Descriptions.Item>
        </Descriptions>
    <Spin spinning={loading}>
    <Form {...layout} name="nest-messages" onFinish={onFinish} className="AddStudentForm">
      <Form.Item name="StudentName" label="Student Name" rules={[{ required: true ,message:'Student Name is required'}]}>
        <Input />
      </Form.Item>
      <Form.Item name="StudentEmail" label="Email" rules={[{ type: 'email',message:"input should be email" },{required:true,message:"Student Email is required"}]}>
        <Input />
      </Form.Item>
      <Form.Item name="ContactNo" label="Phone" rules={[{required:true,message:"Phone number is required" }]}>
        <NumericInput />
      </Form.Item>
      <Form.Item name="Gender" label="Gender"
        rules={[{ required: true, message: 'Gender should be added' }]}
      >
        <Select placeholder="Please select student current semester">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
        </Select>
      </Form.Item>
      <Form.Item name="CurrentSemester" label="Semester"
        rules={[{ required: true, message: 'Semester should be added' }]}
      >
        <Select placeholder="Please select student current semester">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="PassoutYear"
        label="PassoutYear"
        rules={[{ required: true, message: 'Year should be added!' }]}
      >
        <Select placeholder="Please select the passout year">
            {
                YearArray.map(ele=> <Option value={ele} key={ele}>{ele}</Option>)
            }
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Spin>
    </Card>
    </>
  );
};

export default AddStudentComponent