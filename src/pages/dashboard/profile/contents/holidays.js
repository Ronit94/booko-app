import React,{useState,useEffect} from 'react';
import { Calendar, Badge, Skeleton, Empty } from 'antd';
import {CommonServices} from '../../../../providers/services';
function getListData(value,holidays) {
    let listData;
    for(let obj of holidays){
      if(value.date() === obj.Day && value.month()+1 === obj.Month && value.year() === obj.Year){
        listData = [
          { type: 'success', content: obj.Reason },
        ];
      }
    }
    return listData || [];
  }
  
  
  

function HolidayComponent() {
  let [holidays,setHolidays] = useState([]);
   let [loading,setLoading] = useState(true)

   useEffect(() => {
      CommonServices.commonHttpGetServer('admin/fetch-holidays').then((res)=>{
         if(res.status===200){
            setHolidays(res.responseData)
            setLoading(false)
         }
      })
      return () => {
      };
    }, []);

    function dateCellRender(value){
      const listData = getListData(value,holidays);
      return (
        <ul className="events">
          {listData.map(item => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    }

    
    return (
      <Skeleton loading={loading} active={true}>
        {(() => {
          if(holidays){
            return (
              <Calendar dateCellRender={dateCellRender} />
            )
          }else{
            return (
              <Empty/>
            )
          }
        })()}
      </Skeleton>
      );
}


export default HolidayComponent