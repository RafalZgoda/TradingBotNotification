var request = require("request")

var url_hashrate = 'https://blockchain.info/q/hashrate'
var url_price = 'https://api.coindesk.com/v1/bpi/currentprice.json'
var cost_electricity = 0.14 // in €
var my_hashrate = 13500 //in GH/S
var daily_cost_electricity = cost_electricity * 24 
var global_daily_production_btc = 12.5*6*24 // 1800 BTC produced daily 

request({
    url: url_hashrate,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
  		var network_hashrate = body ; 
  		console.log(network_hashrate)
      request({
          url: url_price,
          json: true
      }, function (error, response, body) {

          if (!error && response.statusCode === 200) {
            console.log(body.bpi.EUR.rate_float);
            var btc_price = body.bpi.EUR.rate_float

            var daily_production_btc = my_hashrate / (network_hashrate + my_hashrate) * global_daily_production_btc
            console.log(daily_production_btc)
            var daily_production_euro = daily_production_btc * btc_price
            console.log(daily_production_euro)

          }
      })

    }
})




