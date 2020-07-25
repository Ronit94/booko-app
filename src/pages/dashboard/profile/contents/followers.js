import React,{useState,useEffect} from 'react';
import {Empty,Skeleton} from 'antd';
import { CommonServices } from '../../../../providers/services';
function FollowersComponent() {
   let [followers,setfollowers] = useState([]);
   let [loading,setLoading] = useState(true)

   useEffect(() => {
      CommonServices.commonHttpGetServer('admin/followers').then((res)=>{
         if(res.status===200){
            setfollowers(res.responseData)
            setLoading(false)
         }
      })
      return () => {
      };
    }, []);

    return (
       <Skeleton loading={loading}>
          {(() => {
             if(followers.length===0){
                return (
                   <Empty></Empty>
                )
             }else{
                return (
                   <h1>Followers</h1>
                )
             }

           })()}
       </Skeleton>
    )
}


export default FollowersComponent