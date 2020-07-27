import React,{useRef, useState} from 'react';
import {Col,Row,Skeleton,Divider,Typography, Card,Tabs, Button, Spin} from 'antd';
import { useSelector,useDispatch,connect} from 'react-redux';
import {userinfo,setUserData} from '../../../features/user/userState';
import OverviewComponent from './contents/overview';
import ProjectComponent from './contents/projects';
import FollowersComponent from './contents/followers';
import { UserOutlined,KeyOutlined, PhoneOutlined, BankOutlined, SettingOutlined,AuditOutlined,GlobalOutlined, CloudUploadOutlined,ContactsOutlined} from '@ant-design/icons';
import {AuthService,CommonServices} from '../../../providers/services'
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;


function ProfileComponent(props) {
  let userData = useSelector(userinfo)
  const dispatch = useDispatch()
  let [imageUpload,isloading] = useState(false)
  const hiddenFileInput = useRef(null);
  let loading = false
  if(Object.keys(userData).length===0){
    loading = true
  }
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    isloading(true)
    const fileUploaded = event.target.files[0];
    const path = `Educare/Admin/ProfilePictures/${userData.AdminEmail}`
    AuthService.fileUpload(fileUploaded,path).then((res)=>{
      var tempProps = JSON.parse(JSON.stringify(userData));
      tempProps.meta.profilePicture = res
      CommonServices.commonHttpPatchServer('admin/update',tempProps).then((res)=>{
        if(res.status===200){
          dispatch(setUserData(tempProps))
          isloading(false)
        }
      })
    })
  };

    return (
        <Row>
          <Col span={6} style={{paddingRight: 10}} className="form-box">
            <Card bordered={false}>
            <>
          {(() => {
            if (userData!==undefined && userData.meta) {
              return (
                <>
                <Spin spinning={imageUpload}>
                    <img src={userData.meta.profilePicture ? userData.meta.profilePicture : 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'} alt="profile" className="user-profile"/>
                    <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
                    <Button type="default" className="btn" icon={<CloudUploadOutlined />}  onClick={handleClick}>Upload</Button>
                  <Divider> <Title level={4}>Personal Information</Title></Divider>
                  <Paragraph>
                    <p><KeyOutlined/> {userData.AdminEmail}</p>
                    <p><UserOutlined /> {userData.AdminName}</p>
                    <p><PhoneOutlined  /> {userData.Mobile}</p>
                    <p><AuditOutlined />{userData.meta.Address ? userData.meta.Address : ' Address is not present' } <Link to="/dashboard/settings"><SettingOutlined /></Link></p>
                    <Divider/>
                      <p><ContactsOutlined /> {userData.Designation}</p>
                      <p><BankOutlined/> {userData.CollegeName}</p>
                      <p><GlobalOutlined /> {userData.CollegeState}</p>
                  </Paragraph>
                  </Spin>
                </>
              )
            } else {
              return (
                <>
                    <Skeleton active={true} />
                </>
              )
            }
          })()}
          </>
          </Card>
          </Col>
          <Col span={18} className="form-box">
            <Card bordered={false} loading={loading}>
            <>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Overview" key="1">
                <OverviewComponent/>
              </TabPane>
              <TabPane tab="Projects" key="2">
                <ProjectComponent />
              </TabPane>
              <TabPane tab="Followers" key="3">
                <FollowersComponent />
              </TabPane>
            </Tabs>
            </>
            </Card>
          </Col>
        </Row>
      );
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


export default connect(mapsStateToProps,mapDispatchToProps)(ProfileComponent)