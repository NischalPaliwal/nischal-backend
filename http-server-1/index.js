const express = require('express');
const port = 4000;
const app = express();

app.get('/', function(req, res) {
res.send('<b><i>Hello Everyone</i></b>');
});

app.listen(port);
// create a todo app that lets users store todos on the server