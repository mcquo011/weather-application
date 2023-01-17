let search = document.querySelector('#button');
let city = document.querySelector('#inputValue');
let currentDay = document.querySelector('#currentDay');
let cityHistory = document.querySelector('.searchHistory')
let temp = document.querySelector('#temp');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');
// history var
let history = [];
let forecast = document.querySelector('.forecast')

let APIkey = "3118a6b9d3ec49beecd43997664c59b9";
  

function weather(cityName) {
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIkey;

     fetch(queryURL)
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         let date = new Date();
         let currentDate = date.toLocaleDateString();  
         currentDay.innerHTML = data.name + " (" + currentDate + ")";
         // convert to fahrenheit
         let fahrenheitTemp = Math.round(
           ((data.main.temp - 273.15) * 9) / 5 + 32
         );
         temp.innerHTML = "Temperature: " + fahrenheitTemp + "°F";
         humidity.innerHTML = "Humidity: " + data.main.humidity + " %";
         wind.innerHTML = "wind speed: " + data.wind.speed + " m/s";

         cityHistory.innerHTML = data.name;
          // Add the searched city to an array
          history.push(data.name);
          // Save the array to local storage
          localStorage.setItem("history", JSON.stringify(history));
          console.log(history);
       })
       .catch((error) => console.log(error));
       
       
       // how do I use lon and lat ??? do I need to?? 
       let forecastQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName +
     "&appid=" + APIkey;

  fetch(forecastQueryURL)
    .then((response) => response.json())
    .then((data) => {
      const fiveDayForecast = data.list.slice(0, 5);
      for (let i = 0; i < fiveDayForecast.length; i++) {
        let forecast = fiveDayForecast[i];
        console.log(
          forecast.dt_txt +
            ": " +
            forecast.main.temp +
            "F, " + forecast.wind.speed + " m/s " +
            forecast.weather[0].description
        );
      }
    })
    .catch((error) => console.log(error));
}


// event listener when search button is clicked
search.addEventListener("click", function (event) {
  event.preventDefault();
  let cityName = city.value;
  weather(cityName);
  // only show when search button is clicked and a city is entered 
  document.querySelectorAll(".d-none").forEach(function (element) {
    element.classList.toggle("d-none");

  });
});

// save search history to local storage
// add an event listener to the history buttons 



