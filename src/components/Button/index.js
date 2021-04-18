import React from 'react'
import './style.scss'
const CButton = ({color,content,fontsize,fontcolor,handlerClick})=>{



    return (<div style={{backgroundColor:color,fontSize:fontsize,color:fontcolor}} className='c_button' onClick={handlerClick}>
        {content}
    </div>)
}
export default CButton