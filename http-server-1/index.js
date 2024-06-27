const express = require('express');
const port = 8000;
const app = express();

app.get('/', function(req, res) {
res.json({
   msg: "I am a full-stack developer"
});
});

app.listen(port);
// create a todo app that lets users store todos on the server