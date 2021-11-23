const {WebServer} = require('./WebServer');
const express = require('express');
const app = express();
const server = new WebServer(app, 81);
server.startServer();