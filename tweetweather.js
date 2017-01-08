/* 
Script para publicacion automatica de informacion climatica en Twitter mediante IFTTT 
Demo para Auth0 
Ene 2017 - Victor Martin 
El resultado se puede visualizar en http://www.twitter.com/coder_vic
*/

var request = require('superagent');
var Twit = require('twit');

module.exports = function (ctx, cb) {

  var T = new Twit({
    consumer_key:        ctx.secrets.twconskey,
    consumer_secret:      ctx.secrets.twconssecret,
    access_token:         ctx.secrets.twacctoken,
    access_token_secret:  ctx.secrets.twacctokensecret,
    timeout_ms:           60*1000,  // opcional
  });
  
  var sTwit;
  
  // URL consulta condiciones climaticas en Buenos Aires (ID Ciudad: 7894)
  request.get(`http://dataservice.accuweather.com/currentconditions/v1/7894?apikey=${ctx.secrets.awapikey}&language=es-AR`
    , function response (err, res) {

    sTwit = `El clima en Buenos Aires: ${res.body[0].WeatherText} (${res.body[0].Temperature.Metric.Value}°C)`;

      T.post('statuses/update', { status: sTwit }, function(err, data, response) {});  
      return cb(err, sTwit);
      }
    );
};
