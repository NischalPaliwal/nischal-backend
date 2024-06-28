// npm init -y
// npm install express
// npm install -D nodemon
const express = require("express");
const app = express();
const port = 2000;

app.get("/", (request, response) => {
    response.json({
        msg: "Hi there from JavaScript"
    })
})

app.listen(port, () => {
    console.log(`Running on port value ${port}.`);
})
