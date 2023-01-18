const search = document.querySelector('#button');
const city = document.querySelector('#inputValue');
const currentDay = document.querySelector('#currentDay');
const cityHistory = document.querySelector('.searchHistory')
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
// history var
const history = [];
const forecast = document.querySelector('.forecast')
//var cityLat;
//var cityLon;

const APIkey = "3118a6b9d3ec49beecd43997664c59b9";
  

function weather(cityName) {
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIkey;

     fetch(queryURL)
       .then(function (response) {
         return response.json();
       })
       .then(function (data) {
         console.log(data);
         let cityLat = data.coord.lat
         let cityLon = data.coord.lon
         
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
         let forecastQueryURL =
           "https://api.openweathermap.org/data/2.5/forecast?lat=" +
           cityLat +
           "&lon=" +
           cityLon +
           "&appid=" +
           APIkey;

         fetch(forecastQueryURL)
           .then(function (response) {
             return response.json();
           })  
           .then(function (data) {
          console.log(data.list[0]);
          console.log(data.list[8]);
          console.log(data.list[16]);
          console.log(data.list[22]);
          console.log(data.list[30]);
           
        var forecastCards = document.getElementsByClassName("forecast");
        for (var i = 0; i < forecastCards.length; i++) {
          let date = new Date(data.list[i * 8].dt_txt);
          forecastCards[i].textContent = date.toLocaleDateString()
           var temp = document.createElement("p");
           temp.textContent = "Temp: " + data.list[i * 8].main.temp + "°C";

           var humidity = document.createElement("p");
           humidity.textContent =
             "Humidity: " + data.list[i * 8].main.humidity + "%";

           var wind = document.createElement("p");
           wind.textContent =
             "Wind Speed: " + data.list[i * 8].wind.speed + "m/s";
             
           forecastCards[i].appendChild(temp);
           forecastCards[i].appendChild(humidity);
           forecastCards[i].appendChild(wind);
        }
           })
           .catch((error) => console.log(error));
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
// add an event listener to the history buttons to call weather function
// add clear history button



