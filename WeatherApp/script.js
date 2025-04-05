document.addEventListener("DOMContentLoaded",()=>{
   const cityInput= document.getElementById("city-input");
   const Weatherbtn= document.getElementById("get-weather-btn");
   const weatherInfo=document.getElementById("weather-info");
   const cityname=document.getElementById("city-name");
   const temperatureDisplay=document.getElementById("temperature");
   const descriptionDisplay=document.getElementById("description");
   const errorMessage=document.getElementById("error-message");

   const API_KEY="2ba06f43f3085b2730768f1d75421cbb";
   Weatherbtn.addEventListener("click",async()=>{
    let city= cityInput.value.trim();
    if(!city);

    // server/database is always in another contient

    try{
        const weatherData=await fetchWeatherData(city);
        displayWeatherData(weatherData);

    }catch(error){
         showError()
    }
   })
   async function fetchWeatherData(city){
       //gets the data
       const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
       const response=await fetch(url);
       console.log(typeof response);
       console.log("RESPONSE",response);

       if(!response.ok){
        throw new Error("city not Found");
       }
      const data= await response.json()
       return data;
   }
   function displayWeatherData(data){
    console.log(data);
    const {name,main,weather}=data;
    cityname.textContent=name;
    temperatureDisplay.textContent=`Temperature: ${main.temp}`;
    descriptionDisplay.textContent=`weather: ${weather[0].description}`;
        // unlock the display
     weatherInfo.classList.remove("hidden");
     errorMessage.classList.add("hidden");       
   }
   function showError(){
         weatherInfo.classList.add("hidden");
         errorMessage.classList.remove("hidden");
   }
});