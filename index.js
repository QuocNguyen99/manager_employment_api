var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');

var app = express();
const Mail = require('./routue/mailRoute');
const User = require('./routue/userRoute');
const Employment = require('./routue/employmentRoute');
const Contract = require('./routue/contractRoute');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(logger('dev'));

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.use('/mail', Mail)
app.use('/user', User)
app.use('/employment', Employment)
app.use('/contract', Contract)

mongoose.connect("mongodb+srv://mockproject:fpt@cluster0.rrqt6.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s", port)

})
