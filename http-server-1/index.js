const express = require('express');
const port = 3000;
const app = express();

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.listen(port);
// create a todo app that lets users store todos on the server