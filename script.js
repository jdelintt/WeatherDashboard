$(document).ready(function () {
  $(".five-day-forecast").append("Hello World");
  $(".start-search").on("click", function () {
    console.log($("#citysearch").val());
    var cityParam = $("#citysearch").val();
    var cityParamUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityParam +
      "&appid=927924e4c73455c7286d71a6b1b45a4c";
    $.ajax({
      url: cityParamUrl,
      method: "GET",
    }).then((response) => {
      console.log(response);
    });
  });
});
