import React,{useState,useEffect} from 'react';
import { Table } from 'antd';
import {CommonServices} from '../../../../providers/services';
import {Link} from 'react-router-dom';
const columns = [
    {
      title: 'Name',
      dataIndex: 'StudentName',
      sorter: true
    },
    {
      title: 'Gender',
      dataIndex: "Gender",
      filters: [
        { text: 'Male', value: 'Male' },
        { text: 'Female', value: 'Female' },
      ]
    },
    {
      title : 'Contact No',
      dataIndex : 'ContactNo'
    },
    {
      title: 'Email',
      dataIndex: 'StudentEmail',
      render: text => <Link to="/dashboard/student/list">{text}</Link>
    },
    {
      title : 'Semester',
      dataIndex : 'CurrentSemester',
      sorter: true
    },
    {
      title : 'Year',
      dataIndex : 'PassoutYear',
      sorter: true
    }
];

const getRandomuserParams = params => {
    return {
      results: params.pageSize,
      page: params.current,
      ...params,
    };
};





  

function StudentListComponent(props) {

  let [loading,setLoading] = useState(false)
  let [data,setData] = useState([])

  let [pagination , setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  useEffect(() => {
    let pagination = {
      current: 1,
      pageSize: 10,
    }
    fetch(pagination)
    return () => {};
  }, []);

  const fetch = (params = {}) => {
    setLoading(true)
    CommonServices.commonHttpPostServer('admin/fetch-student',getRandomuserParams(params)).then((res)=>{
      if(res.status===200){
        setLoading(false)
        setData(res.responseData)
        setPagination({
          ...params.pagination,
          total: props.admin.students,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        })
      }
    })
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

    return (
        <Table
        columns={columns}
        rowKey={record => record.StudentEmail}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      /> 
    );
}


export default StudentListComponent