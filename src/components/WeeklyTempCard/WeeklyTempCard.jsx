import "./WeeklyTempCard.styles.scss"

const WeeklyTempCard = ({title,minDegree,maxDegree,icon}) => {
  return (
    <div className="time-card">
      <h5>{title}</h5>
      <div className="row">
        <h5>Min</h5>
        <h2>{minDegree}</h2>
      </div>
      <hr/>
      <div className="row">
        <h5>Max</h5>
        <h2>{maxDegree}</h2>
      </div>
      <hr/>
      <img
        src={icon}
        width={35}
      />
    </div>
  )
}

export default WeeklyTempCard