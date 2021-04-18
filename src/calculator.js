
import React,{useState} from 'react'
import {HistoryOutlined} from '@ant-design/icons'
import CButton from './components/Button'
import './style.scss'
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import Record from './components/Record'

function Calculator() {
    const [preInput , setPreInput] = useState('')
    const [input , setInput] = useState([])
    const [result , setResult] = useState(0)
    const [showResult, setShowResult] = useState(true)
    const [showRecords, setShowRecords ] = useState(false)
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const getResult = (formula) =>{
        if(!formula) formula = input.join('')
        return eval(formula)
    }
    const commandHandler = (cmd) =>{
        // if(preInput==='='){
        //     setInput([])
        //     setPreInput('')
        // }
        if(input.length === 0){
            setShowResult(true)
        }
        if(cmd === 'AC'){
            setInput([])
            setResult(0)
            setShowResult(true)
            return
        }
        if(cmd === '='){
            setResult(getResult())
            setShowResult(true)
            
            // setPreInput('=')
            let refresh = []
            if(localStorage.getItem('records')){
                
                let arr = []
            
                const tem =localStorage.getItem('records').replace('[','').replace(']','').split('},{')


                tem.map((i)=>{
                    const r = i.replace('{','').replace('}','').replaceAll('"','').replaceAll(':','').replace('date','').replace('record','').split(',')
                    arr.push({
                        date:r[0],
                        record:r[1]
                    })
                })
                arr.forEach((i)=>{
                    if(new Date()-new Date(i.date)<604800000){
                        refresh.push(i)
                    }
                })
            }
            refresh.push({
                date: ((new Date())+'').split('').slice(0,15).join(''),
                record: input.join('')+'='+getResult()
            })
            localStorage.setItem('records',JSON.stringify(refresh))

            return
        }
        setShowResult(false)
        if(cmd === '+/-'){
            if(/[\.\d]+/.test(preInput) == true){
                let formula = input.join('')
                formula = formula.replace(/(\-*[\.\d]+)$/i,'(-$1)')
                setResult(getResult(formula))
            }
            return
        }
        if(cmd === '%'){
            if(/[\.\d]+/.test(preInput) == true){
                // let formula = input.join('')
                // formula = formula.replace(/(\-*[\.\d]+)$/i,'($1/100)')
                setPreInput(preInput/100)
                let arr = input
                arr[arr.length-1] = parseInt(arr[arr.length-1])/100+''
                setInput(arr)
               
            }
            return
        }
        if(cmd === 'C'){
            if(input.length === 0) return
            let tem_input = input
            let j;
            let i = tem_input[input.length-1]
            
            tem_input = tem_input.slice(0,input.length-1)
            while(tem_input > 0){
                j = tem_input[tem_input-1]
                if(/\d/.test(i) != /\d/.test(j)) break;
                tem_input.pop()
            }
            setInput(tem_input)
            
         
        }
    }
    const numberHandler = (num) =>{
        setShowResult(false)
        const st = preInput + num
        setPreInput(st)
        const arr = [...input,num]
        setInput(arr)
    }
    const operatorHandler = (op) =>{
        setShowResult(false)
        if( /[\.\d]+/.test(preInput) == true){
            const arr = [...input,op]
            setInput(arr)
            setPreInput(op)
        }
    }
    const getRecords=()=>{
        setShowRecords(true)
    }
    const closeRecords = ()=>{
        setShowRecords(false)
    }
  return (
    
        <div className='container'>
            {showRecords&&<Record handlerClose={closeRecords}/>}
            <Row className='screen-container'>
                <Col flex='100%'>
                    <div className='history' onClick = {getRecords}>
                        <HistoryOutlined style={{color:'#fff'}}/>
                    </div>
                    <p>{showResult?result:input.join('')}</p>
                </Col>
            </Row>
            {/* <------------------------------------ **** SCREEN WIDTH BIGGER THAN HEIGHT**** ------------------------------------ */}     
            <div className='web-container'> 
                <Row className='row-style'>
                    <Col flex='10%'><CButton color='#212121' content='(' fontsize='2em' fontcolor='#fff' /></Col>
                    <Col flex='10%'><CButton color='#212121' content=')' fontsize='2em' fontcolor='#fff' /></Col>
                    <Col flex='10%'><CButton color='#212121' content='mc' fontsize='2em' fontcolor='#fff' /></Col>
                    <Col flex='10%'><CButton color='#212121' content='m+' fontsize='2em' fontcolor='#fff' /></Col>
                    <Col flex='10%'><CButton color='#212121' content='m-' fontsize='2em' fontcolor='#fff'  /></Col>
                    <Col flex='10%'><CButton color='#212121' content='mr' fontsize='2em' fontcolor='#fff' /></Col>
                    {input.length===0?<Col flex='10%'><CButton color='#A5A5A5' content='AC' fontsize='2em' fontcolor='#000' handlerClick={()=>commandHandler('AC')}/></Col>:
                     <Col flex='10%'><CButton color='#A5A5A5' content='C' fontsize='2em' fontcolor='#000' handlerClick={()=>commandHandler('C')}/></Col>}
                    <Col flex='10%'><CButton color='#A5A5A5' content='+/-' fontsize='2em' fontcolor='#000' handlerClick={()=>commandHandler('+/-')}/></Col>
                    <Col flex='10%'><CButton color='#A5A5A5' content='%' fontsize='2em' fontcolor='#000' handlerClick={()=>commandHandler('%')}/></Col>
                    <Col flex='10%'><CButton color='#FD9E08' content='÷' fontsize='2em' fontcolor='#fff' handlerClick={()=>operatorHandler('/')}/></Col>
                </Row>
                <Row className='row-style'>
                    <Col flex='10%'><CButton color='#212121' content='2nd' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='x^2' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='x^3' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='x^y' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='e^x' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='10^x' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#333333' content='7' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('7')}/></Col>
                    <Col flex='10%'><CButton color='#333333' content='8' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('8')}/></Col>
                    <Col flex='10%'><CButton color='#333333' content='9' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('9')}/></Col>
                    <Col flex='10%'><CButton color='#FD9E08' content='X' fontsize='2em' fontcolor='#fff' handlerClick={()=>operatorHandler('*')}/></Col>
                </Row>
                <Row className='row-style'>
                    <Col flex='10%'><CButton color='#212121' content='1/x' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='2√x' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='3√x' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='y√x' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='In' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='log10' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#333333' content='4' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('4')}/></Col>
                    <Col flex='10%'><CButton color='#333333' content='5' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('5')}/></Col>
                    <Col flex='10%'><CButton color='#333333' content='6' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('6')}/></Col>
                    <Col flex='10%'><CButton color='#FD9E08' content='-' fontsize='2em' fontcolor='#fff' handlerClick={()=>operatorHandler('-')}/></Col>
                </Row>
                <Row className='row-style'>
                    <Col flex='10%'><CButton color='#212121' content='x!' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='sin' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='cos' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='tan' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='e' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='EE' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#333333' content='1' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('1')}/></Col>
                    <Col flex='10%'><CButton color='#333333' content='2' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('2')}/></Col>
                    <Col flex='10%'><CButton color='#333333' content='3' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('3')}/></Col>
                    <Col flex='10%'><CButton color='#FD9E08' content='+' fontsize='2em' fontcolor='#fff' handlerClick={()=>operatorHandler('+')}/></Col>
                </Row>
                <Row className='row-style'>
                    <Col flex='10%'><CButton color='#212121' content='Rad' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='sinh' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='cosh' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='tanh' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='π' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='10%'><CButton color='#212121' content='Rand' fontsize='2em' fontcolor='#fff'/></Col>
                    <Col flex='20%'><CButton color='#333333' content='0' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('0')}/></Col>
                    <Col flex='10%'><CButton color='#333333' content='.' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('.')}/></Col>
                    <Col flex='10%'><CButton color='#FD9E08' content='=' fontsize='2em' fontcolor='#fff' handlerClick={()=>commandHandler('=')}/></Col>
                </Row>
            </div>
        
        
            {/* <------------------------------------ **** SCREEN WIDTH SMALLER THAN HEIGHT**** ------------------------------------ */ }
       
            <div className = 'phone-container'>
            <Row className='row-style'>
                    {input.length===0?<Col flex='25%'><CButton color='#A5A5A5' content='AC' fontsize='2em' fontcolor='#000' handlerClick={()=>commandHandler('AC')}/></Col>:
                     <Col flex='25%'><CButton color='#A5A5A5' content='C' fontsize='2em' fontcolor='#000' handlerClick={()=>commandHandler('C')}/></Col>}
                    <Col flex='25%'><CButton color='#A5A5A5' content='+/-' fontsize='2em' fontcolor='#000' handlerClick={()=>commandHandler('+/-')}/></Col>
                    <Col flex='25%'><CButton color='#A5A5A5' content='%' fontsize='2em' fontcolor='#000' handlerClick={()=>commandHandler('%')}/></Col>
                    <Col flex='25%'><CButton color='#FD9E08' content='÷' fontsize='2em' fontcolor='#fff' handlerClick={()=>operatorHandler('/')}/></Col>
                </Row>
                <Row className='row-style'>
                    <Col flex='25%'><CButton color='#333333' content='7' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('7')}/></Col>
                    <Col flex='25%'><CButton color='#333333' content='8' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('8')}/></Col>
                    <Col flex='25%'><CButton color='#333333' content='9' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('9')}/></Col>
                    <Col flex='25%'><CButton color='#FD9E08' content='X' fontsize='2em' fontcolor='#fff' handlerClick={()=>operatorHandler('*')}/></Col>
                </Row>
                <Row className='row-style'>
                    <Col flex='25%'><CButton color='#333333' content='4' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('4')}/></Col>
                    <Col flex='25%'><CButton color='#333333' content='5' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('5')}/></Col>
                    <Col flex='25%'><CButton color='#333333' content='6' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('6')}/></Col>
                    <Col flex='25%'><CButton color='#FD9E08' content='-' fontsize='2em' fontcolor='#fff' handlerClick={()=>operatorHandler('-')}/></Col>
                </Row>
                <Row className='row-style'>
                    <Col flex='25%'><CButton color='#333333' content='1' fontsize='2em' fontcolor='#fff' handlerClick={()=>{numberHandler('1')}}/></Col>
                    <Col flex='25%'><CButton color='#333333' content='2' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('2')}/></Col>
                    <Col flex='25%'><CButton color='#333333' content='3' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('3')}/></Col>
                    <Col flex='25%'><CButton color='#FD9E08' content='+' fontsize='2em' fontcolor='#fff' handlerClick={()=>operatorHandler('+')}/></Col>
                </Row>
                <Row className='row-style'>
                    <Col flex='50%'><CButton color='#333333' content='0' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('0')}/></Col>
                    <Col flex='25%'><CButton color='#333333' content='.' fontsize='2em' fontcolor='#fff' handlerClick={()=>numberHandler('.')}/></Col>
                    <Col flex='25%'><CButton color='#FD9E08' content='=' fontsize='2em' fontcolor='#fff' handlerClick={()=>commandHandler('=')}/></Col>
                </Row>
            </div>
        
        </div>
      
  );
}

export default Calculator;
