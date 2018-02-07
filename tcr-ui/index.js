// Node Server to render the ÐApp
var express = require('express');
var connect = require('connect');
var http = require('http');

// app.use(express.static(__dirname + '/public'));

var app = connect().use(express.static(__dirname + '/public'));
http.createServer(app).listen(9080);
console.log("Access the website on port: 9080");