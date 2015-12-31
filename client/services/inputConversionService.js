angular.module('cityQuest.inputConversionService', [])

.factory('InputConversion', function(){
  var inputConversion = {};

  inputConversion.minutesToHours = function(minutes){
    var hours = Math.floor(minutes / 60);
    var remainder = minutes % 60;
    if(remainder===0) return hours + " hrs"
    if(hours===0) return remainder + " min"
    if(remainder < 10){
      remainder += '0' 
    }
    return hours + ":" + remainder
  };

  inputConversion.timeExtraction = function(time){
    time = time.replace("minutes","");
    time = time.replace("min","");
    return Number(time);
  };

  inputConversion.moneyExtraction = function(money){
    money = money.replace("$","");
    money = money.replace("dollars","");
    if((/free/i).test(money)) return 0;
    return Number(money);
  };

  inputConversion.moneyConversion = function(dollars){
    if(dollars===0) return "Free"
    else return "$" + dollars;
  };

  return inputConversion;
});
