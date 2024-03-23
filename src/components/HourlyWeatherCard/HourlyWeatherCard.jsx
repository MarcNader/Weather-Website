import "./HourlyWeatherCard.styles.scss"

const HourlyWeatherCard = ({title,degree,icon}) => {
    return(
      <div className="hourly-card-temp">
        <h2>{title}</h2>
        <h1>{degree}</h1>
        <img
          src={icon}
          width={35}
        />
      </div>
      )
}

export default HourlyWeatherCard