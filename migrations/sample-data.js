var numDays = 7;

var dateStart = new Date();
var dates = [];
for (let i = 0; i < numDays; i++) {
    let d = new Date();
    d.setDate(dateStart.getDate() + i);
    dates.push(d);
}


module.exports = {
    'items' : [
        {text : "hello", date : dates[0]}, 
        {text : "hi", date : dates[0]}, 
        {text : "bye", date : dates[0]}, 
        {text : "goodbye", date : dates[0]}, 
        {text : "bye", date : dates[1]}, 
        {text : "goodbye", date : dates[1]}, 
        {text : "hello", date : dates[2]}, 
        {text : "hi", date : dates[2]}, 
        {text : "bye", date : dates[2]}, 
        {text : "goodbye", date : dates[2]}, 
        {text : "hello", date : dates[4]}, 
        {text : "hi", date : dates[4]}, 
        {text : "bye", date : dates[4]}, 
        {text : "goodbye", date : dates[5]}
    ]
}
