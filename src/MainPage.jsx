import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Container } from '@mui/material';
import MapLocation from './LocationMap';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const BasicTable = ({rows}) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600 , margin:'auto',height:'300px'}}>
      <Table aria-label="sticky table">
        <TableHead style={{position:'sticky',top:0,background:'white',paddingTop:'2px',marginBottom:'10px'}}>
          <TableRow>
            <TableCell><b>Time</b></TableCell>
            <TableCell align="right"><b>Frequency</b></TableCell>
            <TableCell align="right"><b>Condition</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{marginTop:'5px'}}>
          {[...rows].reverse().map((row) => (
            <TableRow
              key={row.time}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.freq}{' Hz'}</TableCell>
              <TableCell align="right">{'No Seizure'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



const BasicTable2 = ({rows}) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600 , margin:'auto',height:'300px'}}>
      <Table aria-label="sticky table">
        <TableHead style={{position:'sticky',top:0,background:'white',paddingTop:'2px',marginBottom:'10px'}}>
          <TableRow>
            <TableCell><b>Data</b></TableCell>
            <TableCell align="right"><b>Status</b></TableCell>
            <TableCell align="right"><b>Highest Freq</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{marginTop:'5px'}}>
          {[...rows].reverse().map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.freq}{' Hz'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




export default function MainPage(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [freqArray, setFreqArray] = useState([])

  const [status, setStatus] = useState('No Seizure')
  const [lastUpdatedApp, setLastUpdatedApp] = useState(null)

  const [user, setUser] = useState(props.user)
  const [currentFreq, setCurrentFreq] = useState(null)
  const [veryLow, setVeryLow] = useState(0)
  const [updateTime, setUpdateTime] = useState(2000)
  const [highestReading, setHighestReading] = useState(null)

  useEffect(() => {
     if (veryLow > 4) {
      // say device not connected
      setStatus('Not Connected')
     }
  }, [veryLow])

  // useEffect(() => {
  //   if(freqArray.length > 200) setFreqArray([])
  // }, [freqArray])
  

  const update = async () => {
    // const res = await fetch('https://api.thingspeak.com/channels/1803344/feeds.json?results=2')
    // const data = await res.json()

    console.log('getting data from cloud');
    setLastUpdatedApp( new Date().toLocaleString() )
    setFreqArray([...freqArray , {
      time: lastUpdatedApp.split(', ')[1],
      freq : 1
    }])

    // // if not connected ie get very low frequency
    // if(ready < something) {
    //   //increase very low 5 times
    // }
    // else if(reading in range){
    //   // just update frequency
    //   // set verylow to 0
    // }
    // else if(reading too high){
    //   // send alarming signal
    // }

  }

  const [timeInterval, setTimeInterval] = useState(0);
  setTimeout(() => setTimeInterval(timeInterval + 1) , updateTime);
  
  useEffect( () => { 
    update();
   }, [timeInterval]);

   const [alignment, setAlignment] = useState('Medium');

   const handleChangeToggle = (event, newAlignment) => {
     if(!newAlignment) return;
     setAlignment(newAlignment);
     if(newAlignment === 'Fast') setUpdateTime(1000)
     else if(newAlignment === 'Medium') setUpdateTime(3000)
     else if(newAlignment === 'Slow') setUpdateTime(6000)
     else if(newAlignment === 'Stop') setUpdateTime(3600000)
     console.log(newAlignment);
   };
  

  return (
    <div>
        
        <Box sx={{ width: '100%', bgcolor: 'lightblue' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Condition" />
        <Tab label="Location" />
        <Tab label="Information" />
      </Tabs>
    </Box>

    <div>
        {value === 0 && 
        <div>
            <h1 style={{color:'#1976d2'}}>Condition</h1>
            <Container className='condition-container'>
              <p>{'Last Updated : '} {lastUpdatedApp}</p>

              <div style={{
                display:'inline-block',
                maxWidth:'500px',
                textAlign:'center',
                padding:'10px 50px',
                border: status === 'No Seizure' ? '5px solid green' : status === 'Seizure' ? '5px solid red' : '5px solid grey',
                background: status === 'No Seizure' ? 'lightgreen' : status === 'Seizure' ? 'pink' : '#dddddd',
                borderRadius:'20px'
              }} >
                <h1>{status}</h1>
              </div>

              <BasicTable rows={freqArray}/>

              <br/>
              <p>{'Update Rate : '}
              <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChangeToggle}
      aria-label="Platform"
    >
      <ToggleButton value="Fast">Fast</ToggleButton>
      <ToggleButton value="Medium">Med</ToggleButton>
      <ToggleButton value="Slow">Slow</ToggleButton>
      <ToggleButton value="Stop">Stop</ToggleButton>
    </ToggleButtonGroup>
              </p>
            </Container>
        </div>
        }

        {value === 1 && 
        <div>
            <h1 style={{color:'#1976d2'}}>Location</h1>
            <div className='location-container'>
                <MapLocation/>
            </div>
        </div>
        }   

        {value === 2 && 
        <div>
            <h1 style={{color:'#1976d2'}}>Details</h1>
            <Container className='details-container'>
              <p>Name : <b>{props.user.name}</b></p>
              <p>Email : <b>{props.user.email}</b></p>
              <p>Phone Number : <b>{props.user.phoneNumber}</b></p>
              <p>lastLocation : <b>{props.user.lastLocation[0]}{' , '}{props.user.lastLocation[1]}</b></p>
            </Container>

            <BasicTable2 rows={props.history}/>

        </div>
        }
    </div>

    </div>
  );
}
