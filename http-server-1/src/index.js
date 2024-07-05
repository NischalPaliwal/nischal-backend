// npm init -y
// npm install express
// npm install -D nodemon
const express = require("express");
const app = express();
const port = 2011;
const mockUsers = [{ id: 1, name: "Riya Patel", age: 34 },
    { id: 2, name: "Rahul Kumar", age: 54 },
    { id: 3, name: "Nikita Sharma", age: 35 },
    { id: 4, name: "Arjun Das", age: 23 },
    { id: 5, name: "Priya Joshi", age: 12 },
    { id: 6, name: "Sagar Mehta", age: 45 },
    { id: 7, name: "Anjali Kapoor", age: 29 },
    { id: 8, name: "Vikram Trivedi", age: 38 },
    { id: 9, name: "Pooja Pandey", age: 24 },
    { id: 10, name: "Dev Singh", age: 26 },
    { id: 11, name: "Sonia Rao", age: 36 },
    { id: 12, name: "Mohan Gupta", age: 44 }
];

app.use(express.json());


app.get("/users", (request, response) => {
    response.send([{id: 1, username: "nischal", displayName: "Nischal"},
        {id: 2, username: "jack", displayName: "Jack"},
        {id: 3, username: "shane", displayName: "Shane"}
    ])
})
app.get("/products", (request, response) => {
    response.send(mockUsers);
})
app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) {
        return response.status(400).send({
            msg: "BAD REQUEST. INVALID ID."
        });
    }  
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
})

app.get("/api/users", (request, response) => {
    console.log(request.query);
    const {query: { filter, value }} = request;
    // when filter and value are undefined
    if (filter && value) return response.send(mockUsers.filter((user) => user[filter].includes(value)));
    response.send(mockUsers);    // http://127.0.0.1:2011/api?filter=nischal&value=12 => { filter: 'nischal' }  { filter: 'nischal', value: '12' }
});

app.post("/api/users", (request, response) => {
    console.log(request.body);
    const { body } = request;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});

app.put("/api/users/:id", (request, response) => {
    const { 
    body, 
    params: { id }, } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    mockUsers[findUserIndex] = { id: parsedId, ...body };
    return response.sendStatus(200);
});

app.patch("api/users/:id", (request, response) => {
 const {
   body,
   params: { id },
 } = request;
 const parsedId = parseInt(id);
 if(isNaN(parsedId)) return response.sendStatus(400);
 const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
 if (findUserIndex === -1) return response.sendStatus(404);
 mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
 return response.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Running on port value ${port}.`);
});
