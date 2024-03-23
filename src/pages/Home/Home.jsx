import './Home.styles.scss'
import Cloudy from '../../assets/Icons/cloudy.png'
import Search from "../../assets/Icons/search.png"
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {fetchCurrentWeather} from '../../utils/api';

const Home = ()=>{
  const success = (position)=> {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchData(latitude,longitude)
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  
  const error = () => {
    console.log("Unable to retrieve your location");
  }

  useEffect(() => {
      const now = new Date();
  const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second:'2-digit'}); // Format only time
  setCurrentTime(time)
  }, [])
  
  if (navigator.geolocation) {
    console.log("Navigation")
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }

  
  const fetchData = async (latitude,longitude) => {
    const query = `${latitude},${longitude}`

    try {
      const data = await fetchCurrentWeather(query);
      console.log('DATA FETCHED', data);
  
      if (data.data && data.data.weather) {
        console.log("City Name", data.data.request[0].query);
        // setCityName(data.data.request[0].query)
        sessionStorage.setItem('city', JSON.stringify(data.data.request[0].query));
  
        // const weather = data.data.weather;
        // const dateObject = new Date(weather[0].date);
        // const dayOfWeek = dateObject.getDay();
        // const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // const weekdayName = weekdays[dayOfWeek];
        // console.log('Current weather:', weather);
        // console.log('Weekday:', weekdayName);
      } else {
        console.log('Please enter a valid city nName');
      }
    } catch (error) {
      alert('Error:', error);
    }
  };


console.log('hamada');

const WeatherDetails=({title, value})=>{
  return(
    <div className="weather-details">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  )
}

const [currentTime, setCurrentTime] = useState(null);


// useEffect(() => {
//   const updateLocalTime = () => {
//     const now = new Date();
//     const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second:'2-digit'}); // Format only time
//     setCurrentTime(time)
//   };

//   updateLocalTime();

//   const intervalId = setInterval(updateLocalTime, 1000); // Update every second

//   return () => clearInterval(intervalId); // Cleanup function to stop the interval on unmount
// }, []);

  return (
    <div className='container'>
      <div className="first-section">
        <div className="header">
          Egypt
        </div>
        <div className="footer">
          <div className="date-time">
            <div>{currentTime}</div>
            <div className='date'>Tuesday, 19 May 2024</div>
          </div>
          <div className="temperature">11°C</div>
        </div>
      </div>
      <div className="second-section">
        <div className="icon">
          <img
            src={Cloudy}
            width='150px'
            style={{color:'white'}}
            className='dropdwon-icon'
          />
        </div>
        <div className="weather-condition">
          Cloudy
        </div>
        <hr/>
        <div className="search-bar">
          <input
            type='search'
            className="search-box"
            value={'Cairo'}
          />
          <img
            src={Search}
            width='65px'
            style={{color:'white'}}
            className='dropdwon-icon'
          />      
        </div>
        <div style={{color:'white', fontSize:'24px', textAlign:'center', marginTop:'2em'}}>
          <Link to="/dashboard" style={{color:'white', fontSize:'24px', textAlign:'center', marginTop:'2em'}}>Dashboard</Link>
        </div>
        <WeatherDetails title='Temperature' value='50°C'/>
        <WeatherDetails title='Humidity' value='20%'/>
        <WeatherDetails title='Visibility' value='3000 km'/>
        <WeatherDetails title='Wind Speed' value='5 km/h'/>
      </div>
    </div>
  )
}

export default Home