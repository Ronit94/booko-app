import React,{useState} from 'react';
import {useSelector,useDispatch,connect} from 'react-redux';
import {List,Switch,Spin } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {CommonServices} from '../../../../providers/services';
import {socket} from '../../../../app/socket';
import {userinfo,setUserData} from '../../../../features/user/userState';
const data = [
    {
      title: 'Github Integrate',
      description:"Integrate your github account to fetch your repos",
      id: "Github"
    }
    // {
    //   title: 'Facebook Integrate ',
    //   description :"Integrate your Facebook account",
    //   id:"Facebook"
    // }
  ];

function AccountBindings(){

  let [loading,setLoading] = useState(false)
  let userData = useSelector(userinfo);
  const dispatch = useDispatch()


  function showDrawer(value,action){
    setLoading(true)
    let url = window.location.hostname ==='localhost'?'http://localhost:3024/api/':"https://booko-app.herokuapp.com/api/";
    window.open(`${url}core/github`, 'integrate Github', 'width=600,height=600')
    socket.on('integrateGithub',(data)=>{
      let user = JSON.parse(JSON.stringify(userData));
      user.projectUsername = data.username
      user.projects = data.projects
      CommonServices.commonHttpPatchServer('admin/update',user).then((response)=>{
        dispatch(setUserData(user))
        setLoading(false)
      })
      .catch((error)=>{
        setLoading(false)
      })
    })
  }
    return (
      <>
    <Spin spinning={loading}>
    <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item,index) => (
      <List.Item  actions={[
        <Switch onClick={(item)=> showDrawer(data[index],item)}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked={userData.projectUsername ? true:false}
      />]}>
        <List.Item.Meta 
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
  </Spin>
  </>
    )
}

const mapsStateToProps = state=>{
  return {
    user : state.value
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserData: () => dispatch(setUserData())
  }
}

export default connect(mapsStateToProps,mapDispatchToProps)(AccountBindings)