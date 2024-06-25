const express = require('express');
const port = 3000;
const app = express();

// app.get('/', function(req, res) {
// res.send("Hello World!");
// });

app.get("/route-handler", function(req, res) {
    res.json({
      name: "Nischal",
      age: 20
        });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// create a todo app that lets users store todos on the server