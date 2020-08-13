$(document).ready(function () {
  $(".five-day-forecast").append("Hello World");
  $(".start-search").on("click", function () {
    console.log($("#citysearch").val());
    var cityParam = $("#citysearch").val();
    var cityParamUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityParam +
      "&appid=927924e4c73455c7286d71a6b1b45a4c&count=5";

    //   First ajax call for weather API
    $.ajax({
      url: cityParamUrl,
      method: "GET",
    }).then((response) => {
      console.log(response);
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
      $(".appendweather").append(ptagtemp, ptaghumidity, ptagwind);
      var lat = response.coord.lat;
      var long = response.coord.lon;

      var uvParam =
        "http://api.openweathermap.org/data/2.5/uvi?appid=927924e4c73455c7286d71a6b1b45a4c&lat=" +
        lat +
        "&lon=" +
        long;
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
        $.ajax({
          url: urlFiveDay,
          method: "GET",
        }).then((response) => {
          for (let i = 0; i < response.daily.length; i++) {
            var ptag = $("<p>");
            // var date = "Today's date is:" + response.daily[i].temp.day;
            var temp = response.daily[i].temp.day;
            temp = temp - 273;
            temp = temp * (9 / 5);
            temp = "Temp: " + Math.floor(temp + 32);
            var humidity = "Humidity: " + response.daily[i].humidity;

            ptag.append(temp, humidity);
            $(".five-day-forecast").append(ptag);
          }
          console.log(response);
        });
      });
    });
  });
});
