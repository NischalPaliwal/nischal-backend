// npm init -y
// npm install express
// npm install -D nodemon
const express = require("express");
const app = express();
const port = 2007;

app.get("/", (request, response) => {
    // response.json({
    //     msg: "Hi there from JavaScript"
    // })
    response.status(201).send({
          msg: "Hi there from JavaScript"
    })
app.get("/users", (request, response) => {
    response.send([{id: 1, username: "nischal", displayName: "Nischal"},
        {id: 2, username: "jack", displayName: "Jack"},
        {id: 3, username: "shane", displayName: "Shane"}
    ])
})
app.get("/products", (request, response) => {
    response.send([{id: 1471, name: "Cap", price: 230},
        {id: 1472, name: "Shirt", price: 300},
        {id: 1473, name: "Towel", price: 270}
    ])
})
app.get("/users/:id", (request, response) => {
    console.log(request.params);
})
})

app.listen(port, () => {
    console.log(`Running on port value ${port}.`);
})
