var sentJSON = LL.getEvent().getData();
var sentData = JSON.parse(sentJSON);
var currentDay;
var tuday = Date.now();
var datesOnly;

var setCurrentDay = function(alldays){
  for(var i=0;i<alldays.length;i++){
    var day = alldays[i];
    if(Date.parse(day.date) >= Date.now()){
      currentDay = day;
      return;
    }
  }
};
setCurrentDay(sentData);

datesOnly = sentData.map(a => a.day);

flash(datesOnly.join(','));

var dsc = LL.getDesktopByName('MainDesk');
var pan = dsc.getItemByName('NamesWidget');