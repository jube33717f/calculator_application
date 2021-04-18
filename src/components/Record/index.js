import React,{useState,useEffect} from 'react'
import './style.scss'
import {CloseCircleOutlined} from '@ant-design/icons';
import { List, Typography } from 'antd';
const Record = ({handlerClose})=>{
    const [data,setData] = useState([])
    useEffect(()=>{
        if(localStorage.getItem('records') ||localStorage.getItem('records').length<1 ){
            // setData(localStorage.getItem('records'))
            let arr = []
            
            const tem =localStorage.getItem('records').replace('[','').replace(']','').split('},{')


            tem.map((i)=>{
                const r = i.replace('{','').replace('}','').replaceAll('"','').replaceAll(':','').replace('date','').replace('record','').split(',')
                arr.push({
                    date:r[0],
                    record:r[1]
                })
            })
  
            setData(arr)
        }else{
            setData(['No recent records'])
        }
    },[])
    // const getRecords = (){

    // }
    return (
        <div className='records'>
            <List
                header={<div className='head'>Records in 7 days<span onClick={handlerClose}><CloseCircleOutlined /></span></div>}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                    <Typography.Text mark>[{item.date}]</Typography.Text> {item.record}
                    </List.Item>
                )}
            />
        </div>
        
    )
}

export default Record