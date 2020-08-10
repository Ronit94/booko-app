import React,{useState} from 'react';
import {Tabs, Card} from 'antd';
import {useSelector} from 'react-redux';
import {userinfo} from '../../../features/user/userState';
import AddStudentComponent from './contents/add-student.component';
import StudentListComponent from './contents/students-list.component';

const {TabPane} = Tabs




function StudentComponent() {
  let userData = useSelector(userinfo);
  let [studentAdded,studentAddFn] = useState(false)

  function onChildChanged(isadded){
    studentAddFn(isadded)
  }

    return (
        <Card loading={Object.keys(userData).length===0 ? true : false}>
         <Tabs defaultActiveKey="1">
          <TabPane tab="Add Student" key="1">
            <AddStudentComponent admin={userData} callbackParent={onChildChanged} />
          </TabPane>
          <TabPane tab="Student List" key="2">
            <StudentListComponent admin={userData} change />
          </TabPane>
        </Tabs>
        </Card>        
      );
}


export default StudentComponent