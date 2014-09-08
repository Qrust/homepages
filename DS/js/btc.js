var yqlUrlStart = 'https://query.yahooapis.com/v1/public/yql?q=select * from html where url="';
var yqlUrlEnd = '"&format=json&callback=';

var tickerUrl = yqlUrlStart + 'https://data.mtgox.com/api/2/BTCUSD/money/ticker' + yqlUrlEnd;
var lagUrl = yqlUrlStart + 'https://data.mtgox.com/api/1/generic/order/lag' + yqlUrlEnd;

$.get(tickerUrl, function (tickerData) {
     $.get(lagUrl, function (lagData) {
         // Parses YQL data, can be removed if you use a proxy
         var tickerJson = $.parseJSON(tickerData.query.results.body.p);
         var lagJson = $.parseJSON(lagData.query.results.body.p);
         
         var ticker_buy = tickerJson.data.buy.display_short;
         var ticket_high = tickerJson.data.high.display_short;
         var ticket_low = tickerJson.data.low.display_short;
         var ticket_vol = tickerJson.data.vol.display_short;
         var lag = lagJson.return.lag_text;
         
         $('#btcData').html("Crt: [" + ticker_buy + "] High: [" + ticket_high + "] Low: [" + ticket_low + "] Vlm: [" + ticket_vol + " ] Lag: [" + lag + "]");
     });
});