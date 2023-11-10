const temperatureField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchField=document.querySelector(".searchField");
const form=document.querySelector("form");
let target="delhi"
const fetchdata=async(target)=>
{
try {
    const url=`https://api.weatherapi.com/v1/current.json?key=cd59faf0ec5b4d9c853192805231407&q=${target}`;
const response=await fetch(url);
const data=await response.json();
const {current:{temp_c,condition:{icon,text}},location:{name,localtime}}=data
updatedom(`${temp_c}°`,name,icon,text,localtime);
} catch (error) {
    alert("location not found");
}

}
fetchdata(target);

function updatedom(temperature,city,emoji,text,time)
{
    temperatureField.innerText=temperature;
    cityField.innerText=city;
    const exactdate=time.split(" ")[0];
    const exacttime=time.split(" ")[1];
    const exactday=new Date(exactdate).getDay();
    dateField.innerText= `${exacttime}-${getDayFullName(exactday)} ${exactdate}`;
    emojiField.src=emoji;
    weatherField.innerText=text;
}


function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";
  
      case 1:
        return "Monday";
  
      case 2:
        return "Tuesday";
  
      case 3:
        return "Wednesday";
  
      case 4:
        return "Thursday";
  
      case 5:
        return "Friday";
  
      case 6:
        return "Saturday";
  
      default:
        return "Don't Know";
    }
}

const search=(e)=>{
    e.preventDefault();
    target=searchField.value;
    fetchdata(target);
}
form.addEventListener("submit",search)
