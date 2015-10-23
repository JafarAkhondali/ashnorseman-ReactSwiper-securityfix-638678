/**
 * Created by AshZhang on 15/10/23.
 */


'use strict';

var path = require('path'),
    express = require('express'),
    app = express(),
    PORT = 9090;

app.set('port', process.env.PORT || PORT);
app.use(express.static(__dirname + '/build'));

app.listen(app.get('port'), function () {
  console.log('Listening at port: ' + app.get('port'));
});