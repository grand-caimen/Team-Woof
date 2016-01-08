angular.module('cityQuest.inputConversionService', [])

.factory('InputConversion', function(){
  var inputConversion = {};

  inputConversion.capitalizeFirstLetter = function(str) {
    var words = str.split(' ');
    words.forEach(function(val, i, coll){
      coll[i] = val.charAt(0).toUpperCase() + val.slice(1);
    });
    return words.join(' ');
  };

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

  inputConversion.ratingAverage = function (ratingArray) {
    if (ratingArray.length === 0) {
      return 0;
    }
    var total = 0;
    for (var x = 0; x < ratingArray.length; x++) {
      total += ratingArray[x];
    }
    var average = total / ratingArray.length;
    return average.toFixed(2);
  };

  inputConversion.rankConversion = function (val) {
    var ranks = { 0:'Newbie' ,1: 'Peon', 2: 'Serf', 3: 'Commoner', 4: 'Peasent', 5: 'Laborer', 6: 'Burgess', 7: 'Land Holder', 8: 'Apprentice', 9: 'Journeyman', 10: 'Craftsman', 11: 'Peddler', 12: 'Merchant' };
    return ranks[val];
  }

  return inputConversion;
});
