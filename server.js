
// const https = require('https');

// var url = 'https://bitaps.com/api/hashrate'


// https.get(url, (res) => {
// console.log('statusCode:', res.statusCode);
// console.log('headers:', res.headers);

  // res.on('data', (d) => {
 //  process.stdout.write(d);
	
  // });

// }).on('error', (e) => {
  // console.error(e);
// });





var request = require("request")

//var url = 'https://bitaps.com/api/hashrate'
var url = 'https://blockchain.info/q/hashrate'

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
		var json = '{"result":true, "count":42}';
		var hashrate = body ; 
		console.log(hashrate/2)
		//var obj = JSON.parse(body);

		//console.log(obj.hashrate);


    }
})
