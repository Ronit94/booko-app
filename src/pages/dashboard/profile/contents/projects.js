import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {CommonServices} from '../../../../providers/services';
import {Empty,Button,Skeleton} from 'antd';
function ProjectComponent() {
   let [project,setproject] = useState([]);
   let [loading,setLoading] = useState(true)

   useEffect(() => {
      CommonServices.commonHttpGetServer('admin/projects').then((res)=>{
         if(res.status===200){
            setproject(res.responseData)
            setLoading(false)
         }
      })
      return () => {
      };
    }, []);

    return (
       <Skeleton loading={loading}>
          {(() => {
             if(project.length===0){
                return (
                   <Empty><Button type="primary"><Link to="/dashboard/settings">Integrate</Link></Button></Empty>
                )
             }else{
                return (
                   <h1>project</h1>
                )
             }
           })()}
       </Skeleton>
    )
}


export default ProjectComponent