$(document).on('turbolinks:load', function() {

  if ($(".exchange-rates")[0]) {
    var currentDate = new Date();

    // Add 1 to month because January is 0!
    var currentDateString = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();

    var currentValue;

    var moneyCodes = [145, 292, 298];

    moneyCodes.forEach(function(moneyCode) {
      var currentDateRequest = "https://www.nbrb.by/API/ExRates/Rates/" + moneyCode + "?onDate=" + currentDateString;
      $.ajax({
        url: currentDateRequest,
        success: function(data) {
          $("#" + data.Cur_Abbreviation).children()[1].innerHTML = (data.Cur_OfficialRate * data.Cur_Scale).toFixed(3) + " BYN";
        }
      })

    })
  }
})
