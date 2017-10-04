
/*
 * ---------------- NODE + EXPRESS SETUP ------------------ 
 * 
 * You won't need to change anything in this section.
 *
 */

var express = require('express');
var req = require('request');
var app = express();
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
 
/*
 * ------------------ DATA STORAGE -------------------------- 
 */
var voters = [
  {id: 123994331, date: '2017-09-19',name: 'Shlomy Gantz', isMember:true, polling: 'Chicago'},
  {id: 267676848, date: '2017-09-20',name: 'Steve Austin', isMember:true, polling: 'Sin City'},
  {id: 411111111, date: '2017-09-21',name: 'Bruce Wayne', isMember:true, polling: 'Metropolis'},
  {id: 497583677, date: '2017-09-22',name: 'Steven Rogers', isMember:true, polling: 'Metropolis'},
  {id: 543243532, date: '2017-09-22',name: 'Selina Kyle', isMember:true, polling: 'Sin City'},
  {id: 609047787, date: '2017-09-23',name: 'Floyd Lawton', isMember:true, polling: 'Sin City'}
 ];
 
// Eval is evil 
// https://media.blackhat.com/bh-us-11/Sullivan/BH_US_11_Sullivan_Server_Side_WP.pdf

// This API point is used to get stock data
app.post('/stockdata', function (request, response) {

  // Initialize data
  var data = '';
  
  // listen to data
  request.addListener('data', function(chunk) {
  data += chunk; });
  
  request.addListener('end', function() {
    
    //var data = "response.end('success')"
    var secretKey = '8H6ZI233KYY0RGL8';
    var stockQuery = eval("(" + data + ")");
   
    // request data from AlphaAdvantage API
    req('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+stockQuery.symbol+'&apikey='+secretKey +'&outputsize=compact', function (err, res, body) {
     
    // Parse the response
     var today = new Date();
     // no trading on sat/sun
    if(today.getDay()==6) {today.setDate(today.getDate() - 1);}
    if(today.getDay()==0) {today.setDate(today.getDate() - 2);}
    today = today.toISOString().substring(0, 10);

    // Get today's close price
    var closePrice = JSON.parse(body)['Time Series (Daily)'][today]['4. close'];
    // log to console
    console.log(closePrice);
    // Return response back to browser  
    response.end(closePrice);
    }); //req
  }) //request.end
}) //stockdata

// This API point is used to retrieve order status
app.get('/orderStatus', function (request, response) {
  var start = process.hrtime(); // start the timer
  
  var emailExpression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var validEmail = emailExpression.test(request.query.email);

  console.log(process.hrtime(start)) // log end time 

   if (validEmail) {
     response.sendStatus(200); 
  }
  else {
      response.sendStatus(500); 
  }

}) // orderStatus

// This API point is used to validate an id
app.get('/voterValidation', function (request, response) {

  var voter = getVoter(parseInt(request.query.id));
   if (voter!==undefined) {
    response.json(voter);
   } 
   else {
      response.sendStatus(500); 
   }

}) // voterValidation

function getVoter(id) {
  return voters.find(o => o.id === id);
}
  
// jjjjjjjjjjjjjjjjjjjjjjjjjjjj@ccccccccccccccccccccccccccccc.555555555555555555555555555555555555555555555555555555{
