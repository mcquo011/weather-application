const search = document.querySelector('#button');
const city = document.querySelector('#inputValue');
const currentDay = document.querySelector('#currentDay');
const cityHistory = document.querySelector('.searchHistory')
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
let clearHistory = document.querySelector('#clear');
// history var
let searchHistory = JSON.parse(localStorage.getItem("search")) || []



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
        let forecastCards = document.getElementsByClassName("forecast-data");
        for (var i = 0; i < forecastCards.length; i++) {
          let date = new Date(data.list[i * 8].dt_txt);
          forecastCards[i].textContent = date.toLocaleDateString()
           var temp = document.createElement("p");
           let fahrenheitTemp = Math.round(
             ((data.list[i * 8].main.temp - 273.15) * 9) / 5 + 32
           );
           temp.classList.add("card-margin");
           temp.textContent = "Temp: " + fahrenheitTemp + "°F";

           var humidity = document.createElement("p");
           humidity.classList.add("card-margin")
           humidity.textContent =
             "Humidity: " + data.list[i * 8].main.humidity + "%";

           var wind = document.createElement("p");
           wind.classList.add("card-margin")
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
  searchHistory.push(cityName)
  localStorage.setItem("search", JSON.stringify(searchHistory))
  renderHistory();
  // only show when search button is clicked and a city is entered 
  document.querySelectorAll(".d-none").forEach(function (element) {
    element.classList.toggle("d-none");

  });
});

function renderHistory() {
    cityHistory.innerHTML = "" 
  for (let i = 0; i < searchHistory.length; i++) {
    const historyBtn = document.createElement("button")
    historyBtn.innerHTML = searchHistory[i]
    historyBtn.setAttribute("type", "text")
    historyBtn.classList.add("bg-dark", "btn", "text-white", "p-2", "my-2", "d-flex", "flex-wrap", "w-25", "text-center")
    historyBtn.setAttribute("value", searchHistory[i])
    // event listener to bring back weather data for that city when history buttons are clicked
   historyBtn.addEventListener("click", function (event) {
     event.preventDefault();
     let cityName = event.target.textContent;
     weather(cityName); 
     city.value = cityName;
   });

    document.querySelector('.searchHistory').appendChild(historyBtn)
  }
  }



  // gives the user the option to clear history
  clearHistory.addEventListener("click", function(event){
    if (confirm("Are you sure you want to clear history?")){
      localStorage.clear();
      cityHistory.innerHTML = "";


    }
  })






