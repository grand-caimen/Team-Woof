function minutesToHours(minutes){
	var hours = Math.floor(minutes / 60);
	var remainder = minutes % 60;
	if(remainder < 10){
		remainder += '0' 
	}
	return hours + ": " + remainder
}

module.exports.mth = minutesToHours;
