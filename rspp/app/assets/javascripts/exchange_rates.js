var currentDate = new Date();
var previousDate = new Date();
previousDate.setDate(currentDate.getDate() - 1); 

// Add 1 to month because January is 0!
var currentDateString = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
var previousDateString = previousDate.getFullYear() + "-" + (previousDate.getMonth() + 1) + "-" + previousDate.getDate();

var currentValue;
var previousValue;

var moneyCodes = [145, 292, 298];

moneyCodes.forEach(function(moneyCode) {
  var currentDateRequest = "http://www.nbrb.by/API/ExRates/Rates/" + moneyCode + "?onDate=" + currentDateString;
  var previousDateRequest = "http://www.nbrb.by/API/ExRates/Rates/" + moneyCode + "?onDate=" + previousDateString;
  $.ajax({
    url: previousDateRequest,
    success: function(data) {
      previousValue = (data.Cur_OfficialRate * data.Cur_Scale).toFixed(7);

      $.ajax({
        url: currentDateRequest,
        success: function(data) {
          currentValue = (data.Cur_OfficialRate * data.Cur_Scale).toFixed(7);
          if (currentValue > previousValue) {
            $("#" + data.Cur_Abbreviation).addClass("value-up");
            $("#" + data.Cur_Abbreviation).children()[0].innerHTML = (data.Cur_OfficialRate * data.Cur_Scale).toFixed(3);
          } else if (currentValue < previousValue) {
            $("#" + data.Cur_Abbreviation).addClass("value-down");
            $("#" + data.Cur_Abbreviation).children()[0].innerHTML = (data.Cur_OfficialRate * data.Cur_Scale).toFixed(3);
          } else {
            $("#" + data.Cur_Abbreviation).children()[0].innerHTML = (data.Cur_OfficialRate * data.Cur_Scale).toFixed(3);
            $("#" + data.Cur_Abbreviation).removeClass("value-up");
            $("#" + data.Cur_Abbreviation).removeClass("value-down");
          }
        }
      })

    }
  })

})



