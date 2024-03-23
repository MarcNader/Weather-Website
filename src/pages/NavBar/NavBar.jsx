import './NavBar.styles.scss'
import {useEffect, useState} from 'react'
import Cloudy from "../../assets/Icons/cloudy.png"

const NavBar = ({title, handleSearch}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [search, setSearch] = useState('');

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
      handleSearch(search)
      setSearch('');
    }
  };

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
      {/* <img
        src={Cloudy}
        alt="no dp"
        className="profile-picture"
        width={'50px'}
      /> */}
    </div>
  )
}

export default NavBar
