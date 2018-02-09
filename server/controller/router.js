"use strict";
var express = require('express'),
    controller = require('./controller'),
    app = module.exports = express.Router();

app.get('/todo', function(req,res) {
    controller.getTodoList(req, res);
});

app.post('/todo', function(req,res) {
    controller.setTodoItem(req, res);
});

app.delete('/todo/:id', function(req,res) {
    controller.delete(req, res);
});

app.put('/todo', function(req,res) {
    controller.update(req, res);
});

app.post('/todo/json', function(req, res){
    controller.setTodoJson(req, res);
})