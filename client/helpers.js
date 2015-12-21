function minutesToHours(minutes){
	var hours = Math.floor(minutes / 60);
	var remainder = minutes % 60;
  if(remainder===0) return hours + " hrs"
  if(hours===0) return remainder + " min"
	if(remainder < 10){
		remainder += '0' 
	}
	return hours + ":" + remainder
}

function timeExtraction(time){
  time = time.replace("minutes","");
  time = time.replace("min","");
  return Number(time);
}

function moneyExtraction(money){
  money = money.replace("$","");
  money = money.replace("dollars","");
  if((/free/i).test(money)) return 0;
  return Number(money);
}

function moneyConversion(dollars){
  if(dollars===0) return "Free"
  else return "$" + dollars;
}

//module.exports.mth = minutesToHours;
