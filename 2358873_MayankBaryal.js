/* This function checks for network connectivity, 
local storage availability and call the display function*/
async function Home(city){
  const localData = JSON.parse(localStorage.getItem(city.toUpperCase()));   // getting local storage data
  if (navigator.onLine){      // checking connectivity
    if (localData == null){     // condition for no data in local storage
      let data = await searchWeather(city)      // calling the function for API call
      if (data == null){                  // condition for data not found
        alert("Invalid City Name. Please Enter Valid city!")
      }
      else{             // condition for  when online
        // displaying all the necessary weather data for the default city
        displaySearchcity(data)
        fetch("2358873_MayankBaryal_insert.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(data) 
        }) ;
        let today = new Date();
        let date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        data["date"] = date;
        localStorage.setItem(city.toUpperCase(), JSON.stringify(data));
      }
    }else{        // condition for data in local storagge
      const today = new Date();
      const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
      if (date == localData["date"]){     // condition for current day data in local storage
        console.log("Data Accessed from Local Storage");
        // displaying all the necessary weather data for the default city
        displaySearchcity(localData)
      }
      else{          // condition for API call if not current day data
        console.log("different");
          console.log("Data Accessed from API");
        const apikey = "f8abfc44e2af1867338ff56a07005e1a";
        //fetch data for the default city
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        let res = await fetch(url);
        const data = await res.json();
        // displaying all the necessary weather data for the default city
        displaySearchcity(data)
        //inserting data to the database
        fetch("2358873_MayankBaryal_insert.php", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(data) 
        }) ;
        let today = new Date();
        let date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        data["date"] = date;
        localStorage.setItem(city.toUpperCase(), JSON.stringify(data));   // setting the item to local storage  
      }
    }
  }else{            //condition for no internet connection
    if (localData == null){           // no data when offline
      alert("No past city data! Please connect to the internet")
    }else{                      // display the data from local storage when offline
      console.log("Data fetched from Local Storage")
      displaySearchcity(localData)
    }
  }
  // adding event listener for history
  document.querySelector(".history").addEventListener("click", () => {
    window.location.href = `2358873_MayankBaryal_history.html?city=${city}`;
  });

  }

/* this function checks whether the city is valid or not and the user
input is also valid or not */
async function searchWeather(city){
  console.log("Data Accessed from API");
  const apikey = "api_key";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  let res = await fetch(url);
  const data = await res.json();
  if (data.cod < 400){          // checking for successful API fetch
    return data;
  } 
  return null;        
}


// This function displays the data for the user input cities
function displaySearchcity(data){
  try{
      console.log(data)
      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString(undefined, options);
      document.getElementById("date").innerHTML = `${formattedDate} Local Time`;
      const country = data.sys.country;
      document.getElementById("city").innerHTML =  `${data.name},` + country;
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
      alert(error);
  }
  }

// adding event listener for click option
document.getElementById("search").addEventListener("click", () => {
  let city = document.getElementById("city_input").value;
  if (city == ""){      // condition to check blank input
    alert("Enter a city name")
  }else{
    Home(city)
  }
});
// adding event listeners for enter key press
document.querySelector("input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let city = document.getElementById("city_input").value;
    if (city == ""){      // condition to check blank input
      alert("Enter a city name")
    }else{
      Home(city)
    }
  }
});
// calling the function to display default city data
Home("Wrexham")
