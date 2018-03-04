var request = require("request")

var url_hashrate = 'https://blockchain.info/q/hashrate'
var url_price = 'https://api.coindesk.com/v1/bpi/currentprice.json'
var cost_electricity = 0.14 // in €
var my_hashrate = 13500 //in GH/S
var consomation = 1.3 // in KW/h
var daily_cost_electricity = cost_electricity * consomation * 24 
var global_daily_production_btc = 12.5*6*24 // 1800 BTC produced daily 

var network_hashrate, btc_price
var daily_production_btc, daily_production_euro, cost_production_1_btc, rate_production_electricity 
var string_notification 

request({
    url: url_hashrate,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
  		var network_hashrate = body ; 
  		console.log("Network hashrate : "+ network_hashrate+" gH/s")
      request({
          url: url_price,
          json: true
      }, function (error, response, body) {

          if (!error && response.statusCode === 200) {
            btc_price = body.bpi.EUR.rate_float
            console.log("Price of 1 BTC : "+precisionRound(btc_price,2)+"€");

            daily_production_btc = my_hashrate / (network_hashrate + my_hashrate) * global_daily_production_btc
            daily_production_euro = daily_production_btc * btc_price
            cost_production_1_btc = daily_cost_electricity / daily_production_btc
            console.log("Cost of production of 1 BTC : "+precisionRound(cost_production_1_btc,2)+"€")
            rate_production_electricity = btc_price / cost_production_1_btc
            console.log("Rate Price of selling / Price of production "+precisionRound(rate_production_electricity,2)*100+"%")   
            string_notification = "Rate Price of selling / Price of production "+precisionRound(rate_production_electricity,2)*100+"%"
            if(rate_production_electricity < 3){

              request.post('https://api.pushover.net/1/messages.json', {form:{token:'a8od1dgi1mvxnfbsn7xskxnd4tb5kw',user:'ucpvxd1x9ogjkvvi1zpqibt5ir71bh', message:string_notification}})




            }         
          }
      })

    }
})





function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
