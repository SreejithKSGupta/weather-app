addEventListeners();



function gid(id) {
    return document.getElementById(id);
}
function getWeatherData() {
    var city = gid("searchhere").value;
    if (city != "") {
        getDataFromApi(city);
    }
    else {
        alert("Please enter a city name");
    }
}
function addEventListeners() {  
    gid("searchicon").addEventListener("click", getWeatherData);
    gid("searchhere").addEventListener("keyup", function (event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            gid("searchicon").click();
        }
    });
    gid("locationbtn").addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                getDataFromApiByLocation(lat, lon);
            });
        }
    });


}
function getDataFromApi(city) {
    let apiKey = "e5d23761b7a54403fec26823850a37bd";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(url).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            printDataToHtml(data)
            setbg(data.weather[0].description);
        })
        .catch(function (error) {
            gid("weathershow").innerHTML = '<div class="wdata" >Place not Found</div>';
        })
}

function getDataFromApiByLocation(lat, lon) {
    let apiKey = "e5d23761b7a54403fec26823850a37bd";
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(url).then(function (response) {
        return response.json();
    })

        .then(function (data) {
            printDataToHtml(data)
            setbg(data.weather[0].description);
            gid("searchhere").value = data.name;
        })
        .catch(function (error) {
            gid("weathershow").innerHTML = '<div class="wdata" >Place not Found</div>';
        })
}

function printDataToHtml(data) {
    var wicon = '<img id="wicon" src="' + "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png" + '" alt="weather icon">';
    var Wcity = '<div class="wdata" ><div>City</div><div>' + data.name + '</div></div>';
    var wcountry = '<div class="wdata" ><div>Country</div><div>' + data.sys.country + '</div></div>';
    var wtemp = '<div class="wdata" ><div>Temperature</div><div>' + (data.main.temp - 273.15).toFixed(2) + '°C </div></div>';
    var whum = '<div class="wdata" ><div>Humidity</div><div>' + data.main.humidity + '%</div></div>';
    var wdes = '<div class="wdata" ><div>Description</div><div>' + data.weather[0].description + '</div></div>';
    var wpress = '<div class="wdata" ><div>Pressure</div><div>' + data.main.pressure + ' hPa</div></div>';
    var wwind = '<div class="wdata" ><div>Wind Speed</div><div>' + data.wind.speed + 'm/s</div></div>';
    var wcloud = '<div class="wdata" ><div>Cloudiness</div><div>' + data.clouds.all + '%</div></div>';
    var wheight = '<div class="wdata" ><div>Height</div><div>' + data.main.sea_level + 'm</div></div>';

    gid("weathershow").innerHTML = wicon + Wcity + wcountry + wtemp + whum + wdes + wpress + wwind + wcloud + wheight;

}

function setbg(description) {
    console.log(description);
    // set background image according to weather description
    if (description.includes("clear")) {
        document.body.style.backgroundImage = "url('BG_images/clear sky.webp')";
    }
    else if (description.includes("cloud")) {
        document.body.style.backgroundImage = "url('BG_images/cloudy.webp')";
    }
    else if (description.includes("rain")) {
        document.body.style.backgroundImage = "url('BG_images/rainy.webp')";
    }
    else if (description.includes("snow")) {
        document.body.style.backgroundImage = "url('BG_images/snowy.webp')";
    }
    else {
        document.body.style.backgroundImage = "url('BG_images/bg.webp')";
        console.log("no image found");
    }
}


