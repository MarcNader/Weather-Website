import "./WeeklyTempCard.styles.scss"

const WeeklyTempCard = ({title,minDegree,maxDegree}) => {
  const dateObject = new Date(title);
  const dayOfWeek = dateObject.getDay();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekdayName = weekdays[dayOfWeek];

  return (
    <div className="Weekly-card-temp">
      <h5>{weekdayName}</h5>
      <div className="row">
        <h5>Min</h5>
        <h2>{minDegree}</h2>
      </div>
      <hr/>
      <div className="row">
        <h5>Max</h5>
        <h2>{maxDegree}</h2>
      </div>
    </div>
  )
}

export default WeeklyTempCard