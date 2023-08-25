// This function displays the data for the default city
async function Home(city){
  const apikey = "f8abfc44e2af1867338ff56a07005e1a";
  //fetch data for the default city
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
   let res = await fetch(url)
   const data = await res.json();
      // getting current date
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString(undefined, options);
      // displaying all the necessary weather data for the default city
      document.getElementById("date").innerHTML = `${formattedDate} Local Time`;
      document.getElementById("city").innerHTML =  `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").innerHTML = `${data.main.temp}°C`;
      document.getElementById("humidity").innerHTML = `<img height="70px" width = "70px" src ="https://img.icons8.com/color/96/humidity.png" alt="humidity icon"><b>Humidity: </b>${data.main.humidity} %`;
      document.getElementById("windspeed").innerHTML = `<img height="70px" width = "70px" src ="https://img.icons8.com/color/96/wind.png" alt="windspeed icon"><b>Windspeed: </b>${data.wind.speed}  km/h`;
      document.getElementById("pressure").innerHTML = `<img height="70px" width = "70px" src="https://img.icons8.com/color/96/atmospheric-pressure.png" alt="pressure icon"><b>Pressure: </b>${data.main.pressure}  hPa`;
      document.getElementById("weatherIcon").innerHTML = `<img height="90px" width = "90px" src="http://openweathermap.org/img/w/${ data.weather[0].icon}.png">`;
      const weatherCondition = data.weather[0].description;
      const words = weatherCondition.split(" ");
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      const capitalizedWeatherCondition = capitalizedWords.join(" ");
      document.getElementById("condition").innerHTML = `Weather Condition: ${capitalizedWeatherCondition}`
    
      
    fetch("2358873_MayankBaryal_insert.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data) 
      }) 
document.querySelector(".history").addEventListener("click", () => {
  window.location.href = `2358873_MayankBaryal_history.html?city=${city}`;
});
}

// This function check whether the user has input valid city name or not 
function search_city(city_name){
  return new Promise((resolve, reject) => {
    const api = "f8abfc44e2af1867338ff56a07005e1a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api}&units=metric`;
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // condition for empty input
        if (city_name.length ===0){
          reject("Please enter a city name")
        }
        // condition for invalid city name
        else if (data.cod == 404){
          reject("City Not found! Enter valid city")
        }
        // condition for valid city
        else{
          resolve(data)      
          fetch("2358873_MayankBaryal_insert.php", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) 
        }) 
        document.querySelector(".history").addEventListener("click", () => {
          window.location.href = `2358873_MayankBaryal_history.html?city=${city_name}`;
          });
      }
    })
})
};

// This function displays the data for the user input cities
function displaySearchcity(data){
  try{
      console.log(data)
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString(undefined, options);
      document.getElementById("date").innerHTML = `${formattedDate} Local Time`;
      document.getElementById("city").innerHTML =  `${data.name},${data.sys.country}`;
      document.getElementById("temperature").innerHTML = `${data.main.temp} °C`;
      document.getElementById("humidity").innerHTML = `<img height="70px" width = "70px" src ="https://img.icons8.com/color/96/humidity.png" alt="humidity icon"><b>Humidity: </b>${data.main.humidity} %`;
      document.getElementById("windspeed").innerHTML = `<img height="70px" width = "70px" src ="https://img.icons8.com/color/96/wind.png" alt="windspeed icon"><b>Windspeed: </b>${data.wind.speed}km/h`;
      document.getElementById("pressure").innerHTML = `<img height="70px" width = "70px" src="https://img.icons8.com/color/96/atmospheric-pressure.png" alt="pressure icon"><b>Pressure: </b>${data.main.pressure} hPa`;
      document.getElementById("weatherIcon").innerHTML = `<img height="100px" width = "100px"src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
      const weatherCondition = data.weather[0].description;
      const words = weatherCondition.split(" ");
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      const capitalizedWeatherCondition = capitalizedWords.join(" ");
      document.getElementById("condition").innerHTML = `Weather Condition: ${capitalizedWeatherCondition}`;}
  catch(error){
      alert(error)
  }
  }

// this function uses async function to check and display the data by calling the respective functions
async function input_check(){
  try{
    const input = document.getElementById("city_input").value;
    data = await search_city(input);
    setTimeout(() => {
      displaySearchcity(data)
    },1000);
  }
  catch(error){
    alert(error);
  }
}

// adding event of button click
document.getElementById("search").addEventListener("click", input_check);
//adding event for pressing enter key instead of clicking button
document.querySelector("input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        input_check();
    }
});

// calling the function to display default city data
Home("Wrexham")
