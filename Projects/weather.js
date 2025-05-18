const apiKey = '640a2975859e8704fff9dbd4207df7a3';

document.getElementById("search-button").addEventListener("click", function () {
  const city = document.getElementById("city-input").value.trim();
  const errorMessage = document.getElementById("error-message");
  const loading = document.getElementById("loading");

  errorMessage.textContent = "";
  document.querySelector(".container").classList.add("stop-animation");
  loading.style.display = "block";

  if (!city) {
    alert("Please enter a city name");
    loading.style.display = "none";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
      document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById("location").textContent = `Location: ${data.name}, ${data.sys.country}`;
      document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;

      // const iconCode = data.weather[0].icon;
      // const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      // fetch(iconUrl)
      //   .then((response) => response.blob())
      //   .then((blob) => {
      //     const imgURL = URL.createObjectURL(blob);
      //     document.getElementById("weather-icon").src = imgURL;
      //   });

    })
    .catch((error) => {
      document.getElementById("temperature").textContent = "";
      document.getElementById("humidity").textContent = "";
      document.getElementById("location").textContent = "";
      document.getElementById("description").textContent = "";
      document.getElementById("weather-icon").src = "";
      errorMessage.textContent = error.message;
    })
    .finally(() => {
      loading.style.display = "none";
    });
});

document.getElementById("city-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    document.getElementById("search-button").click();
  }
});
