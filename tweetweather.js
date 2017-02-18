/* 
Script para publicacion automatica de informacion útil en TW 
Feb 2017 - Victor Martin 
El resultado se puede visualizar en http://www.twitter.com/coder_vic
*/

var request = require('superagent');
var Twit = require('twit');

var sTwit;

// URL consulta condiciones climaticas en Buenos Aires (ID Ciudad: 7894)
var sUrlAccu = `http://dataservice.accuweather.com/currentconditions/v1/7894?apikey=*&language=es-AR`;

var T = new Twit({
  consumer_key: '*',
  consumer_secret: '*',
  access_token: '*',
  access_token_secret: '*',
  timeout_ms: 60 * 1000,  // opcional
});

console.log(`Obteniendo info de ${sUrlAccu}`);

request.get(sUrlAccu
  , function response(err, res) {


    sTwit = `El clima en Buenos Aires: ${res.body[0].WeatherText} (${res.body[0].Temperature.Metric.Value}°C)`;
    console.log(`Publicando: ${sTwit}`);
    t.post('statuses/update', { status: sTwit });

    Console.log('Saliendo (0)');
    process.exit(0);
  }
);
