import './NavBar.styles.scss'
import {Fragment, useEffect, useState} from 'react'
import Cloudy from "../../assets/Icons/cloudy.png"
import Fahrenheit from"../../assets/Icons/fahrenheit.png"
import Celsius from"../../assets/Icons/celsius.png"
import Switch from "react-switch";

const NavBar = ({title}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [search, setSearch] = useState('');
  const [metricSystem, setMetricSystem] = useState(true)
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sessionStorage.setItem('city', JSON.stringify(search));
      window.location.reload()
    }
  };

  const handleToggle = (checked)=>{
    setMetricSystem(checked)
  }

  return (
    <div className="navbar">
      {/* {
        screenWidth < 701 && (
          <div onClick={openDrawer} className='drop-down-container'>
            <img
              src={Cloudy}
              width={'20px'}
              className='dropdwon-icon'
            />
          </div>
        )
      } */}
      <div className='row'>
        <h3 style={{color:'white', fontFamily:'Tahoma', paddingLeft:'1em'}}>{title}</h3>
        <input
          type="search"
          style={{width:'300px', 
          height:'35px', 
          marginLeft:'1em',
          borderRadius:'10px', 
          borderColor:'purple'}}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Switch 
        onChange={handleToggle} 
        checked={metricSystem} 
        offColor="#08f"
        onColor="#2e7445"
        uncheckedIcon={
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
            <img src={Fahrenheit} width={20}/>
          </div>
      }
        checkedIcon={
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
            <img src={Celsius} width={20}/>
          </div>
      }
      />
    </div>
  )
}

export default NavBar
