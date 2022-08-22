import './App.css';
import MainPage from './MainPage';
import ResponsiveAppBar from './Navbar';
import { useState } from 'react';

function App() {

  const [position, setPosition] = useState(null)

  const resetPositon = () => {
    setTimeout( () => {

    } , 2000 )
  }

  const [userDetails, setUserDetails] = useState({
    name : 'Ashar Saghir',
    email : 'saghirashar@gmail.com',
    password: '123',
    phoneNumber: '0300 2617058',
    lastLocation: [24.873901 , 67.061645] ,
  })

  const [history, setHistory] = useState([
    {
      date : '18 Aug 2022',
      status: 'No Seizure',
      freq: '1Hz'
    },
    {
      date : '19 Aug 2022',
      status: 'No Seizure',
      freq: '1Hz'
    },
    {
      date : '20 Aug 2022',
      status: 'No Seizure',
      freq: '1Hz'
    },
    {
      date : '21 Aug 2022',
      status: 'No Seizure',
      freq: '1Hz'
    },
    {
      date : '22 Aug 2022',
      status: 'No Seizure',
      freq: '1Hz'
    },
    {
      date : '23 Aug 2022',
      status: 'No Seizure',
      freq: '1Hz'
    },
    {
      date : '24 Aug 2022',
      status: 'No Seizure',
      freq: null
    },
  ])

  return (
    <div className="App">
      <ResponsiveAppBar/>
       <MainPage user={userDetails} history={history}/>
    </div>
  );
}

export default App;
