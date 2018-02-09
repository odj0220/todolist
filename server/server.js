'use strict';

var fs = require('fs'),
    express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    //router = require('./controller/router'),
    controller = require('./controller/controller');


// bodyParser, cors,controller.js
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors({'Access-Control-Expose-Headers': '*'}));

//------- db --------//
var connect = mongoose.connect('mongodb://ec2-13-125-162-137.ap-northeast-2.compute.amazonaws.com/todolist');

//------- router --------//
app.use(require('./controller/router'));

//------- setting --------//
app.use(express.static(__dirname + '/../dist'));
app.all('/*', function(req,res,next){
    res.sendFile('../dist/index.html', {root: __dirname});
});


app.listen(3000, function(){
    console.log('TodoList Server Start');
})