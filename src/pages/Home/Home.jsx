import './Home.styles.scss'
// import Cloudy from '../../assets/Icons/cloudy.png'
import Cloudy from '../../assets/Icons/cloudy.png'
import Search from "../../assets/Icons/search.png"
import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {fetchCurrentWeather} from '../../utils/api';
import {iconRenderer} from '../../utils/helpers';

const Home = ()=>{
const navigate = useNavigate();
const [currentTime, setCurrentTime] = useState(null);
const [icon, setIcon] = useState();
const [search, setSearch] = useState('');
const [currentCondition, setcurrentCondition] = useState()

  const [location, setLocation] = useState(
    {
      city: '',
      country:''
    }
  )

  const success = (position)=> {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchData(latitude,longitude)
  }


  const error = () => {
    setLocation(
      {
        city: "Cairo"
      }
    )
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation not supported");
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second:'2-digit'}); // Format only time
    setCurrentTime(time)
  }, [])
  
  const fetchData = async (latitude,longitude) => {
    const query = `${latitude},${longitude}`

    try {
      const response = await fetchCurrentWeather(query);
      console.log('DATA FETCHED in Home', response);
  
      if (response.data) {
        const city = response.data.nearest_area[0].region[0].value
        const country = response.data.nearest_area[0].country[0].value
        setcurrentCondition(response.data.current_condition)

        const icon = iconRenderer(response.data.current_condition[0].weatherDesc[0].value)
        setIcon(icon)
        setLocation(
          {
            city,
            country
          }
        )
        sessionStorage.setItem('city', JSON.stringify(`${city}, ${country}`));

  
      } else {
        alert('Please enter a valid city nName');
      }
    } catch (error) {
      alert("Error:" + error.message);
    }
  };

const WeatherDetails=({title, value})=>{
  return(
    <div className="weather-details">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  )
}

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    sessionStorage.setItem('city', JSON.stringify(search));
    console.log("Enter Pressed");
    navigate("/dashboard")
    }
};

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const currentDate = new Date().toLocaleDateString('en-US', options);

  return (
    <div className='container'>
      <div className="first-section">
        <div className="header">
          {location && location.country}
        </div>
        <div className="footer">
          <div className="date-time">
            <div>{currentTime}</div>
            <div className='date'>{currentDate}</div>
          </div>
          <div className="temperature">
            {`${currentCondition && currentCondition[0]?.temp_C} °C`}
          </div>
        </div>
      </div>
      <div className="second-section">
        <div className="icon">
          <img
            src={icon}
            width={150}
            style={{color:'white'}}
            className='dropdwon-icon'
          />
        </div>
        <div className="weather-condition">
          {currentCondition && currentCondition[0]?.weatherDesc[0].value}
        </div>
        <hr/>
        <div className="search-bar">
          <input
            type='search'
            className="search-box"
            placeholder='Search City'
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img
            src={Search}
            width='65px'
            style={{color:'white'}}
            className='dropdwon-icon'
          />      
        </div>
        <div>
          <WeatherDetails title='UV Index' value={currentCondition && currentCondition[0]?.uvIndex}/>
          <WeatherDetails title='Humidity' value={`${currentCondition && currentCondition[0]?.humidity}%`}/>
          <WeatherDetails title='Visibility' value={`${currentCondition && currentCondition[0]?.visibility} km`}/>
          <WeatherDetails title='Wind Speed' value={`${currentCondition && currentCondition[0]?.humidity} km/h`}/>
        </div>
        <div style={{fontSize:'24px', textAlign:'center', paddingTop:'1em'}}>
          <Link
            to="/dashboard"
            style={{color:'#80CDF6'}}>More Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home