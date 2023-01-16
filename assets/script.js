let search = document.querySelector('#button');
let city = document.querySelector('#inputValue');
let currentDay = document.querySelector('#currentDay');
let currentCity = document.querySelector('#currentCity')
let temp = document.querySelector('#temp');
let humidity = document.querySelector('#humidity');
let wind = document.querySelector('#wind');


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
        console.log(data)
        let date = new Date();
        let currentDate = date.toLocaleDateString();
        currentCity.innerHTML = data.name
        currentDay.innerHTML = data.name + " ("+ currentDate +")"
        let fahrenheitTemp = Math.round(
          ((data.main.temp - 273.15) * 9) / 5 + 32
        );
        temp.textContent = "Temperature: " + fahrenheitTemp + "°F"
        humidity.innerHTML = "Humidity: " + data.main.humidity + "%"
        wind.innerHTML = "wind speed: " + data.wind.speed + "mph"

       }
       )
       .catch((error) => console.log(error));
}

search.addEventListener('click', function(){
  event.preventDefault();
  let searchCity = city.value
  weather(searchCity);
}) 