import React,{useState,useEffect} from 'react';
import { Table, Card } from 'antd';
import {CommonServices} from '../../../../providers/services';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {userinfo} from '../../../../features/user/userState';
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
      render: (text,record) => <Link to={`/dashboard/students/details/${record._id}`}>{text}</Link>
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
  let userData = useSelector(userinfo);
  let [loading,setLoading] = useState(false)
  let [data,setData] = useState([])
  let total = userData.students
  let [pagination , setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  

  useEffect(() => {
    let pagination = {
      current: 1,
      pageSize: 10,
    }
    const fetchData = (params = {}) => {
      setLoading(true)
      CommonServices.commonHttpPostServer('admin/fetch-student',getRandomuserParams(params)).then((res)=>{
        if(res.status===200){
          setLoading(false)
          setData(res.responseData)
          setPagination({
            ...params.pagination,
            total: total
          })
        }
      })
    };
    fetchData(pagination)
  }, [total]);

  const fetchData = (params = {}) => {
    setLoading(true)
    CommonServices.commonHttpPostServer('admin/fetch-student',getRandomuserParams(params)).then((res)=>{
      if(res.status===200){
        setLoading(false)
        setData(res.responseData)
        setPagination({
          ...params.pagination,
          total: total
        })
      }
    })
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

    return (
      <Card>
        <Table
        columns={columns}
        rowKey={record => record.StudentEmail}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      /> 
      </Card>
    );
}


export default StudentListComponent