"use strict";

var mongoose = require('mongoose'),
    Todo = require('../model/todo'),
    app = this;

exports.getTodoList = function(req, res){
    Todo.find({}, function(err, docs){
        if(err) res.status(500).send(err.message);
        return res.jsonp(docs);
    })
};

exports.setTodoItem = function(req, res){
    var todo = new Todo(req.body);
    todo.save(function(err){
        if(err) res.status(500).send(err.message);
        return res.jsonp(todo);
    })
};

exports.delete = function(req, res){
    var id = req.params.id;
    Todo.remove({_id: id}, function(err){
        if(err) res.status(500).send(err.message);
        return res.status(200).send('remove');
    })
}

exports.update = function(req, res){
    var item = req.body;
    Todo.update({_id: item._id}, item, function(err, doc){
        if(err) res.status(500).send(err.message);
        return res.jsonp(doc);
    })
}

exports.setTodoJson = function(req, res){
    var json = req.body;
    if(json.length){
        json.forEach(function(d){
            delete d._id;
            delete d.sec;
        });
        Todo.insertMany(json, function(err, docs){
            if(err) res.status(500).send(err.message);
            return res.status(200).send('success');
        })
    }else{
        delete json._id;
        delete json.sec;
        var todo = new Todo(json);
        todo.save(function(){
            if(err) res.status(500).send(err.message);
            return res.status(200).send('success');
        });
    }
}

