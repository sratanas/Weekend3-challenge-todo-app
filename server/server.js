var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 5000;
var toDo = require('./routes/toDo')
var completedTable = require('./routes/completedTable') //EXPERIMENTATION

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/toDO', toDo)
app.use('/completedTable', completedTable) //EXPERIMENTATION

app.listen(port, function () {
    console.log('listening on port', port);
})