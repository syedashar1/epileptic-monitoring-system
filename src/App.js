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
    lastLocation: [24.9324375 , 67.1126875] ,
  })

  const [history, setHistory] = useState([
    {
      date : '18 Aug 2022',
      status: 'No Seizure',
      freq: '1.203'
    },
    {
      date : '19 Aug 2022',
      status: 'No Seizure',
      freq: '1.90'
    },
    {
      date : '20 Aug 2022',
      status: 'No Seizure',
      freq: '1.732'
    },
    {
      date : '21 Aug 2022',
      status: 'No Seizure',
      freq: '1.02'
    },
    {
      date : '22 Aug 2022',
      status: 'No Seizure',
      freq: '1.09'
    },
    {
      date : '23 Aug 2022',
      status: 'No Seizure',
      freq: '1.605'
    },

  ])


      // {
    //   date : '24 Aug 2022',
    //   status: 'No Seizure',
    //   freq: null
    // },


  return (
    <div className="App">
      <ResponsiveAppBar/>
       <MainPage user={userDetails} history={history}/>
    </div>
  );
}

export default App;
