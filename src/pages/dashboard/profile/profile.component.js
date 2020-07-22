import React from 'react';
import {Col,Row,Spin} from 'antd';
import { useSelector} from 'react-redux';
import {userinfo} from '../../../features/user/userState';
export function ProfileComponent() {
  let userData = useSelector(userinfo)
    return (
        <Row>
          <Col span={6}>
          {(() => {
            if (userData!==undefined && userData.meta) {
              return (
                <div  onClick={e => e.preventDefault()}>
                  <img src={userData.meta.ProfilePicture ? userData.meta.ProfilePicture : 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'} alt="profile"/>
                </div>
              )
            } else {
              return (
                <div>
                    <Spin />
                </div>
              )
            }
          })()}
          </Col>
          <Col span={18}>

          </Col>
        </Row>
      );
}
