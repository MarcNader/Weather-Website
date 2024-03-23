/* eslint-disable multiline-ternary */
import {useEffect,useState} from 'react';
import LineChart from '../../components/LineChart/LineChart';
import NavBar from '../NavBar/NavBar';
import './Dashboard.styles.scss'
import {fetchCurrentWeather} from '../../utils/api';

import Precipitation from "../../assets/Icons/waterdrop.png"
import Humidity from "../../assets/Icons/coloredHumidity.png"
import Visibility from "../../assets/Icons/coloredVisivbility.png"
import Rainy from "../../assets/Icons/rainy.png"
import Clock from "../../assets/Icons/clock.png"
import Calendar from "../../assets/Icons/calendar.png"

import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import WeeklyTempCard from '../../components/WeeklyTempCard/WeeklyTempCard';
import HourlyWeatherCard from '../../components/HourlyWeatherCard/HourlyWeatherCard';
import {iconRenderer} from '../../utils/helpers';
import InfoCard from '../../components/InfoCard/InfoCard';

const Dashboard = () => {
const city = sessionStorage.getItem('city');

const [location, setLocation] = useState(
  {
    city: JSON.parse(city),
    country:''
  }
)

const [data, setData] = useState(
    [
      {
        data: 'now',
        maxtempC: "22",
        maxtempF: "71",
        mintempC: "12",
        mintempF: "54",
        uvIndex: "8",
        hourly: [
          {
            time: "0",
            tempC: "14",
            tempF: "57",
            weatherDesc: [
              {
                  value: "Clear "
              }
          ],
          precipMM: "0.0",
          precipInches: "0.0",
          humidity: "60",
          visibility: "10",
          visibilityMiles: "6",
          FeelsLikeC: "13",
          FeelsLikeF: "55",
          }
        ]
      }

    ]
)

const[weatherIcon, setWeatherIcon] = useState(Rainy)

const ChartSize = window.innerWidth < 1000 ? 
{
  width: 270,
  height: 300,
}
: {
  width: 700,
  height: 520,
}
 
const [currentCondition, setcurrentCondition] = useState()

const fetchData = async (name) => {
  try {
    const response = await fetchCurrentWeather(name);

    if (response.data) {
      setLocation(
        {
          city: response.data.nearest_area[0].areaName[0].value,
          country: response.data.nearest_area[0].country[0].value,
        }
        )
      setData(response.data.weather)
      setcurrentCondition(response.data.current_condition)

      const weather_icon = iconRenderer(response.data.current_condition.weatherDesc[0].value)
      setWeatherIcon(weather_icon)
      sessionStorage.setItem('city', JSON.stringify(response.data.request[0].query));
    } else {
      alert('Please enter a valid city and/or country name');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

useEffect(() => {
 fetchData(location.city + location.country)
}, [])

 const PerCentageInfoCard =({title,percentage,icon})=>{
  const calcHumidity = (percentage)=>{
    if (percentage < 30) {
      return 'LOW';
  } else if (percentage >= 30 && percentage < 60) {
      return 'Average';
  } else {
      return 'HIGH';
  }
  }

  const severity = calcHumidity(percentage)
  const iconSize = window.innerWidth < 900 ? 30 : 40
  const barSize = window.innerWidth < 900 ? 'small-bar-size' : 'large-bar-size'

    return(
      <div className="percentage-info-card">
        <div className='percentage-info-header'>
          <img
            src={icon}
            width={iconSize}
            height={iconSize}
            style={{marginRight:'5px'}}
          />
          <h4>{title}</h4>
        </div>
        <div className='progressBar-container'>
          <div className={barSize}> 
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
              strokeLinecap: 'butt',
              // Text size
              textSize: '30px',
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,                    
              // Colors
              pathColor: `white`,
              textColor: 'white',
              trailColor: '#282660',
              backgroundColor: '#3e98c7',
            })}
            />
          </div>
          <h1 style={{margin:0}}>{severity}</h1>
        </div>
      </div>
    )
 }


 const infoCardsData = [
  {
    title:"feels like",
    icon: Rainy,
    value:currentCondition && currentCondition[0]?.FeelsLikeC + " °C",
  },
  {
    title:"Precipitation",
    icon:Precipitation,
    value:currentCondition && currentCondition[0]?.precipMM + " mm",
  },
  {
    title:"Visibility",
    icon:Visibility,
    value:currentCondition && currentCondition[0]?.visibility + " km",
  },
 ]

const hourlyTemps = data[0].hourly.map(obj => {
  const {time, tempC} = obj;

  return {
    time: time === "0" ? 0 : Number(time) / 100,
    temp: tempC
  };
});

  return (
    <div className="wrapper">
      <NavBar title={`${location.city},${location.country}`}/>
      <div className="body">
        <div className="gadgets-container">
          <div className="weather-card">
            <div className="first-row">
              <div className="header">
                <h1>{currentCondition && `${currentCondition[0]?.temp_C} °C`}</h1>
                <h2>{currentCondition && currentCondition[0]?.weatherDesc[0].value}</h2>
              </div>  
              <div className="footer">
                <div className="info-cards-container">
                  {
                infoCardsData.map((data,index)=>{
                  const icon = data.title === "feels like" ? weatherIcon : data.icon

                  return (
                    <InfoCard
                      key={index}
                      title={data.title}
                      icon={icon}
                      value={data.value}
                    />)
                })
              }
                  <PerCentageInfoCard
                    title={"Humidity"}
                    icon={Humidity}
                    percentage={currentCondition && currentCondition[0]?.humidity}
                  />
                </div>
              </div>
            </div>
            <div className="second-row">
              <h1>Today Hourly T°</h1>
              <LineChart
                data={hourlyTemps}
                width={ChartSize.width}
                height={ChartSize.height}
              />
            </div>
          </div> 
          <div className="time-cards-container">
            <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
              <img src={Clock} width={30}/>
              <h4>Hourly Forecast</h4>
            </div>
            <hr/>
            <div className="time-card-wrapper" style={{gap:'3em'}}>
              {
                    data[0].hourly.map((value,index)=>{
                      let time
                      value.time === '0'
                      ? time = "0"
                      : time = String(parseInt(value.time) / 100)
                      
                      const title = time + ':00'
                      const icon = iconRenderer(value.weatherDesc[0].value)

                      return(
                        <HourlyWeatherCard
                          key={index}
                          title={title}
                          degree={value.tempC}
                          icon={icon}
                        />
                      )
                      })
                  }
            </div>
          </div>
          <div className="time-cards-container weekly-card">
            <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
              <img src={Calendar} width={30}/>
              <h4> Two Weeks Forecast</h4>
            </div>
            <hr/>
            <div className="time-card-wrapper">
              {
              data.map((value,index)=>(                        
                <WeeklyTempCard
                  key={index}
                  title={value.date}
                  maxDegree={value.maxtempC}
                  minDegree={value.mintempC}
                />
                    )
                    )
                }
            </div>
          </div>
        </div>        
      </div>
    </div>
  )
}

export default Dashboard