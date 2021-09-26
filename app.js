const timeE1= document.getElementById('time');
const dateE1= document.getElementById('date');
const currentWeatheritemsE1= document.getElementById('current-weather-items');
const timezone=document.getElementById('time-zone');

const countryE1= document.getElementById('country')
const weatherForecastE1= document.getElementById('weather-forecast');
const currentTempE1= document.getElementById('current-temp');

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months= ['Jan','Feb','Mar','Apr','June','jul','Aug','Sep','Oct','Nov','Dec'];

const API_KEY='39343e1b5c151f04f1f3a5ef7f185ddc';

setInterval(() =>{
const time = new Date();
const month =  time.getMonth();
const date =  time.getDate();
const day=  time.getDay();
const hour=  time.getHours();
const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
const minutes =  time.getMinutes();
const ampm =  hour >= 12 ? 'Pm' : 'Am'

timeE1.innerHTML = (hoursIn12HrFormat <10? '0'+ hoursIn12HrFormat:hoursIn12HrFormat) + ':'+(minutes < 10? '0' +minutes: minutes)+' '+`<span id="am-pm">${ampm}</span>`

dateE1.innerHTML = days[day] + ','+date+ ' '+months[month]
},1000  );

getweaherData()

function getweaherData(){
navigator.geolocation.getCurrentPosition((success)=>{

    console.log(success);
    let{latitude,longitude} = success.coords;
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutes&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

  console.log(data)

  showweatherData(data);
  })

})

}
function showweatherData(data) {
let {humidity, pressure,sunrise, sunset, wind_speed}= data.current;

timezone.innerHTML= data.timezone;





currentWeatheritemsE1.innerHTML=`<div class="weather-items">
<div>Humidity</div> 
  <div>${humidity}%</div> 

</div>
<div class="weather-items">
<p>Pressure</p>
<div>${pressure}</div> 

</div>
<div class="weather-items">
<div>Wind Speed</div> 
<div>${wind_speed}</div> 

</div>
</div>
<div class="weather-items">
<div>Sunrise</div> 
<div>${window.moment(sunrise * 1000).format('HH:mm a')}</div> 

</div>

</div>
<div class="weather-items">
<div>Sunset</div> 
<div>${window.moment(sunset * 1000).format('HH:mm a')}</div> 

</div>`



;
countryE1.innerHTML= data.lat +''+ 'N' + data.lon +''+ 'E';
let otherDayForcast= ' '
data.daily.forEach((day,idx) => {
if (idx ==0){

currentTempE1.innerHTML = `
<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather-icon" class="w-icon">

<div class="other ">
  <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <div class="Temp" >Night ${day.temp.night}&#176; c </div>
            <div class="Temp" >Day ${day.temp.day}&#176; c </div>

</div>


`



}else{
otherDayForcast +=`   
<div class="weather-forecast-item">

            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
            <div class="Temp" >Night ${day.temp.night}&#176; c </div>
            <div class="Temp" >Day ${day.temp.day}&#176; c </div>
</div>`

}


})
weatherForecastE1.innerHTML= otherDayForcast;

}
