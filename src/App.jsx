
import { TextField,Button,Stack } from '@mui/material'
import './App.css'
import { useState } from 'react'

function App() {

  const [interest,setInterest] = useState(0);
  const [principle,setPrinciple] = useState(0);
  const [rate,setRate] = useState(0);
  const [year,setYear] = useState(0);

  const [validPrinciple,setValidPrinciple] = useState(true);
  const [validRate,setValidRate] = useState(true);
  const [validYear,setValidYear] = useState(true);


  const validUserInput=(e)=>{
    const {name,value} = e.target;
    console.log(`${name} , ${value}`);
    console.log(!!value.match(/^\d*\.?\d*$/));

    if(!!value.match(/^\d*\.?\d*$/)){
      //valid pattern
      if(name==='principle'){
        setPrinciple(value)
        setValidPrinciple(true)
      }else if(name==='rate'){
        setRate(value)
        setValidRate(true)
      }else{
        setYear(value)
        setValidYear(true)
      }
    }else{
      //invalid pattern
      if(name==='principle'){
        setPrinciple(value);
        setValidPrinciple(false)
      }else if(name==='rate'){
        setRate(value);
        setValidRate(false)
      }else{
        setYear(value)
        setValidYear(false)

    }
  }
}

  const handleReset = ()=>{
    setPrinciple(0)
    setRate (0);
    setYear (0);
    setInterest(0);

    setValidPrinciple(true);
    setValidRate(true);
    setValidRate(true);

  }

  const handleCalculate=(e)=>{
    e.preventDefault() //used to prevent the automatic refresh happen when using form
    if(!principle || !rate || !year){
      alert("Please fill the form completely!!!")
    }else{
      setInterest(principle*rate*year/100)
    }
  }
  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center bg-dark'>
      <div style={{width:'600px'}} className='bg-light p-5 rounded'>
        <h3 style={{height:'50px'}}>Simple Intrest Calculator</h3>
        <p>Calculate your simple interest Easily</p>
        <div style={{width:'100%',height:'150px'}} className='d-flex justify-content-center bg-warning rounded shadow text-light mt-5 flex-column align-items-center'>
          <h1 style={{height:'55px'}}>&#8377;{interest}</h1>
          <p className='fw-bold'> Total Simple Interest</p>
        </div>
        <form className='mt-5' onSubmit={handleCalculate}>
            <div className="mb-3">
              <TextField className='w-100' id="outlined-basic-principle" label="&#8377; Principle Amount" variant="outlined" name='principle' value={principle || ""} onChange={e=>validUserInput(e)}/>
            </div>
            { !validPrinciple&&<div className='mb-3 text-danger fw-bolder'>
              Invalid Principle Amount</div>
            }

            <div className="mb-3">
              <TextField className='w-100' id="outlined-basic-rate" label="Rate of Interest %" variant="outlined" name='rate' value={rate || ""} onChange={e=>validUserInput(e)}/>
            </div>

            { !validRate&&<div className='mb-3 text-danger fw-bolder'>
              Invalid Rate </div>
            }

            <div className="mb-3">
            <TextField className='w-100' id="outlined-basic-tp" label="Time Period (Yr)" variant="outlined" name='year' value={year || ""} onChange={e=>validUserInput(e)}/>
            </div>
            { !validYear&&<div className='mb-3 text-danger fw-bolder'>
              Invalid Year</div>
            }

            <Stack direction={'row'} spacing={2}>
              <Button style={{height:'70px',width:'50%'}} variant="contained" type='submit' className="bg-dark"  disabled={validPrinciple&&validRate&&validYear?false:true}>Calculate</Button>
              <Button style={{height:'70px',width:'50%'}} variant="outlined" className='text-dark' onClick={handleReset}>RESET</Button>
            </Stack>
        </form>
      </div>   
    </div>
  )
}

export default App
