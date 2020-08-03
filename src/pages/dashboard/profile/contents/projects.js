import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {CommonServices} from '../../../../providers/services';
import {Empty,Button,Skeleton,Row,Col,Card} from 'antd';
import { SettingOutlined,EditOutlined,ShareAltOutlined,GithubOutlined} from '@ant-design/icons';
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
                 <Row gutter={[16, 16]}>
                     {
                        project.map(el => 
                           <Col span={6} key={el.id}> 
                              <Card actions={[<SettingOutlined key="setting" />,
                                             <EditOutlined key="edit" />,
                                             <ShareAltOutlined key="Share" />,
                                          ]} hoverable={true}>
                                       <p style={{fontWeight:'bold'}}><GithubOutlined/> {el.name}</p>
                                       {/* <Meta avatar={<GithubOutlined/>} title={el.name} /> */}
                                       <p>Watcher {el.watchers}</p>
                                       <p>Stars {el.stargazers_count}</p>
                                       <p>Private {el.private===true?'True':'False'}</p>
                                       <p>Issue {el.has_issues ? 'True':'False'}</p>
                              </Card>
                           </Col>
                           )
                     }
                 </Row>
                )
             }
           })()}
       </Skeleton>
    )
}


export default ProjectComponent