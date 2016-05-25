var keystone = require('keystone');
var request = require('request');

exports = module.exports = {

  calendarDispo: function(req, res){
    var params = {
      ca_id: 639,
      ho_id: 2074,
      anno: 2016,
      mese: 7
    };

    request({
      method: 'GET',
      url: 'https://secure.hermeshotels.com/customersflash/calendar.do?method=calendar',
      qs: params
    }, function(error, response, body){
      res.send(body);
    });

  },

  listDispo: function(req, res){

    var params = {
      ca_id: 639,
      ho_id: 2074,
      dataArrivo: 20160808,
      dataPartenza: 20160809,
      adulti: 2,
      bambini: 0,
      mt_id: 0,
      pc_id: 0
    };

    request({
      method: 'GET',
      url: 'https://secure.hermeshotels.com/customersflash/avail.do?method=search',
      qs: params
    }, function(error, response, body){
      res.send(body);
    })
  },

  checkDispo: function(req, res){
    var req = https.get('https://secure.hermeshotels.com/customersflash/availCheck.do?method=search', function(response){
      var xml = '';
      reponse.on('data', function(chunk){
        xml += chunk;
      });
      response.on('en')
    })
  }

}
