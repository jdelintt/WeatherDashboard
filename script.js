$(document).ready(function () {
  $(".five-day-forecast").append("Hello World");

  $.ajax({
    url: latLongUrl,
    method: "GET",
  }).then((response) => {});
});
