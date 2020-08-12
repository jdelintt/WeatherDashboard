$(document).ready(function () {
  $(".five-day-forecast").append("Hello World");
  $(".start-search").on("click", function () {
    console.log($("#citysearch").val());
    var cityParam = $("#citysearch").val();
    var cityParamUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityParam +
      "&appid=927924e4c73455c7286d71a6b1b45a4c";

    //   First ajax call for weather API
    $.ajax({
      url: cityParamUrl,
      method: "GET",
    }).then((response) => {
      var ptag = $("<p>");
      var temperature = response.main.temp;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
      ptag.append(temperature, humidity, windSpeed);
      $(".citylist").append(ptag);
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
      });
    });
  });
});
