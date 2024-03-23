/* eslint-disable multiline-ternary */
import "./InfoCard.styles.scss"

const InfoCard = ({title,value,icon})=>{
    const iconSize = window.innerWidth < 900 ? 40 : 80

    return(
      <div className="info-card">
        <h4>{title}</h4>
        <div className="info-row">
          <h2>{value}</h2>
          <img
            src={icon}
            width={iconSize}
            height={iconSize}
          />
        </div>
      </div>
    )
   }

export default InfoCard