import "./HourlyWeatherCard.styles.scss"

const HourlyWeatherCard = ({title,degree,icon}) => {
    return(
      <div className="time-card">
        <h5>{title}</h5>
        <h2>{degree}</h2>
        <img
          src={icon}
          width={35}
        />
      </div>
      )
}

export default HourlyWeatherCard