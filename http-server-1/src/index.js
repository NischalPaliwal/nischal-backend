// npm init -y
// npm install express
// npm install -D nodemon
const express = require("express");
const app = express();
const port = 2012;
const mockUsers = [{id: 1471, name: "Cap", price: 230},
    {id: 1472, name: "Shirt", price: 300},
    {id: 1473, name: "Towel", price: 270}
];

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
    response.send(mockUsers);
})
app.get("/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if(isNaN(parsedId)) {
     return response.status(701).send({
        msg: "BAD REQUEST. INVALID ID."
     })
    }
    else {
        return response.send(mockUsers.find((user) => user.id === parsedId))
    }
})
})

app.listen(port, () => {
    console.log(`Running on port value ${port}.`);
})
