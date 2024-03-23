import Cloudy from "../assets/Icons/cloudy.png"
import Rainy from "../assets/Icons/rainy.png"
import Sunny from "../assets/Icons/sunny.png"
import Overcast from "../assets/Icons/overcast.png"

export const iconRenderer= (text)=>{
    const lowerText = text.toLowerCase();

    if(lowerText.includes("cloudy") || lowerText.includes("cloud")) return Cloudy

    if(lowerText.includes("rainy") || lowerText.includes("rain")) return Rainy

    if(lowerText.includes("clear") || lowerText.includes("sunny")) return Sunny

    if(lowerText.includes("overcast") || lowerText.includes("sunny")) return Overcast
}