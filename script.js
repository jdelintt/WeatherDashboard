$(document).ready(function () {
  let history = [];
  let historyJSON = localStorage.getItem("cities");
  if (historyJSON != null) {
    history = JSON.parse(historyJSON);
  }

  renderSearchHistory();

  function renderSearchHistory() {
    $("#city-list").empty();
    history.forEach(function (city) {
      var li = $("<li>");
      li.addClass("list-group-item");
      li.text(city);
      li.click(function (event) {
        renderSearchResult(city);
      });
      $("#city-list").append(li);
    });
  }

  function renderSearchResult(city) {
    $(".appendweather").empty();
    $(".five-day-forecast").empty();

    var cityParamUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=927924e4c73455c7286d71a6b1b45a4c&count=5";

    //   First ajax call for weather API fahrenheit, humdity, and wind speed
    $.ajax({
      url: cityParamUrl,
      method: "GET",
    })
      .then((response) => {
        history.unshift(response.name);
        history = [...new Set(history)];
        localStorage.setItem("cities", JSON.stringify(history));
        renderSearchHistory();

        console.log(response);
        var header = $("<h1>");
        header.text(response.name);
        var ptagtemp = $("<p>");
        var ptaghumidity = $("<p>");
        var ptagwind = $("<p>");
        var temperature = response.main.temp;
        temperature = temperature - 273;
        temperature = temperature * (9 / 5);
        temperature = Math.floor(temperature + 32);
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        ptagtemp.append("Temperature is " + temperature + " F");
        ptaghumidity.append("Humidity: " + humidity + "%");
        ptagwind.append(windSpeed + " MPH");
        header.append(ptagtemp, ptaghumidity, ptagwind);
        $(".appendweather").append(header);
        var lat = response.coord.lat;
        var long = response.coord.lon;

        var uvParam =
          "http://api.openweathermap.org/data/2.5/uvi?appid=927924e4c73455c7286d71a6b1b45a4c&lat=" +
          lat +
          "&lon=" +
          long;

        // Ajax call for UV value
        $.ajax({
          url: uvParam,
          method: "GET",
        }).then((response) => {
          console.log(response);
          var ptagUVI = $("<p>");
          ptagUVI.append("UVI:" + response.value);
          $(".appendweather").append(ptagUVI);

          var urlFiveDay =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            long +
            "&appid=927924e4c73455c7286d71a6b1b45a4c";

          // Ajax call for five day forecast

          $.ajax({
            url: urlFiveDay,
            method: "GET",
          }).then((response) => {
            for (let i = 0; i < response.daily.length; i++) {
              var pTagTemp = $("<p>");
              var pTagHum = $("<p>");
              var divTag = $("<div>");
              divTag.addClass("card");
              divTag.attr("style", "width: 18rem;");
              var divBody = $("<div>");
              divBody.addClass("card-body");
              divTag.append(divBody);
              // var date = "Today's date is:" + response.daily[i].temp.day;
              var temp = response.daily[i].temp.day;
              temp = temp - 273;
              temp = temp * (9 / 5);
              temp = "Temp: " + Math.floor(temp + 32);
              var humidity = "Humidity: " + response.daily[i].humidity;
              pTagTemp.append(temp);
              pTagHum.append(humidity);

              divBody.append(pTagTemp, pTagHum);
              $(".five-day-forecast").append(divTag);
            }
            console.log(response);
          });
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  $(".five-day-forecast").append("Hello World");
  $("#search-btn").on("click", function (event) {
    event.preventDefault();

    var city = $("#citysearch").val();

    renderSearchResult(city);
  });
});
