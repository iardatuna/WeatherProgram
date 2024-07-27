//#region Controls

const weatherForm = document.querySelector(".WeatherForm");
const cityInput = document.querySelector(".CityInput");
const card = document.querySelector(".Card");
const apiKey = ""; //retrieve apiKey from https://openweathermap.org/



//#region Functions 

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {

        try {
            const weatherData = await GetWeatherData(city);
            DisplayWeatherInfo(weatherData);
        }

        catch (error) {
            console.error(error);
            DisplayErrorMessage(error);
        }

    }
    else {
        DisplayErrorMessage("Please enter a city");
    }
});

async function GetWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Data Couldn't retrieved");
    }

    return await response.json();
}

function DisplayWeatherInfo(data) {
    console.log(data);
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";


    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");


    cityDisplay.textContent = city;
    cityDisplay.classList.add("CityDisplay");
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("TemperatureDisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("HumidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add("DescDisplay");
    card.appendChild(descDisplay);

    weatherEmoji.textContent = GetWeatherEmoji(id);
    weatherEmoji.classList.add("WeatherEmoji");
    card.appendChild(weatherEmoji);
}

function GetWeatherEmoji(weatherTypeId) {
    console.log(weatherTypeId);
    switch (true) {
        case weatherTypeId >= 200 && weatherTypeId < 300:
            return "⛈";
        case weatherTypeId >= 300 && weatherTypeId < 400:
            return "🌧";
        case weatherTypeId >= 500 && weatherTypeId < 600:
            return "🌧";
        case weatherTypeId >= 600 && weatherTypeId < 700:
            return "❄";
        case weatherTypeId >= 700 && weatherTypeId < 800:
            return "🌫";
        case weatherTypeId == 800:
            return "☀";
        case weatherTypeId > 800 && weatherTypeId < 810:
            return "☁";

        default:
            return "⁉";
    }
}

function DisplayErrorMessage(message) {
    const errorDisplayElement = document.createElement("p");
    errorDisplayElement.textContent = message;
    errorDisplayElement.classList.add("ErrorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplayElement);
}

//#endregion