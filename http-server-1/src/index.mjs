// npm init -y
// npm install express
// npm install -D nodemon
// cookie-parser => npm i cookie-parser
// npm i express-session
import express from "express";
import cookieParser from "cookie-parser";
// In Express.js, the cookie-parser middleware is responsible for parsing cookies sent in the request headers
// and making them available on the req.cookies object.
import { query, validationResult, body, checkSchema } from "express-validator";
import session from "express-session";
import { createUserValidationSchema } from './utils/validationSchemas.mjs';
import { mockUsers } from './utils/constants.mjs';
import usersRouter from './routes/users.mjs';
const app = express();
const port = 2011;

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};

app.use(loggingMiddleware);

app.use(cookieParser("helloworld"));  // secret

app.use(
    session({
        secret: "nischal the developer",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 2,
        }
    }));

app.use(express.json());

app.use(usersRouter);

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

app.get("/api/users", query("filter").isString().notEmpty().withMessage("Must not be empty").isLength({min: 2, max: 8}).withMessage("Must be 2-8 characters"), (request, response) => {
    console.log(request.session);
    console.log(request.sessionID);
    const result = validationResult(request);
    console.log(result);
    console.log(request.query);
    const {query: { filter, value }} = request;
    // when filter and value are undefined
    if (filter && value) return response.send(mockUsers.filter((user) => user[filter].includes(value)));
    response.send(mockUsers);    // http://127.0.0.1:2011/api?filter=nischal&value=12 => { filter: 'nischal' }  { filter: 'nischal', value: '12' }
});

app.post("/api/users", checkSchema(createUserValidationSchema), (request, response) => {
    const result = validationResult(request);
    console.log(result);
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

app.patch("/api/users/:id", (request, response) => {
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

app.delete("/api/users/:id", (request, response) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if(findUserIndex === -1) return response.sendStatus(404);
    mockUsers.splice(findUserIndex, 1);
    return response.sendStatus(200);
});

app.get("/", (request, response) => {
    console.log(request.session);
    console.log(request.sessionID);
    request.session.visited = true;  // modifying session object
    response.cookie("hello", "world", { maxAge: 60000, signed: true });
    response.status(201).send({ msg: "Hello" });
});

app.post("/api/auth", (request, response) => {
    const { body: { name, age } } = request;
    const findUser = mockUsers.find((user) => user.name === name);
    if (!findUser || findUser.age !== age) return response.status(401).send({ msg: "BAD CREDENTIALS" });
    request.session.user = findUser;    // stores user information in the session
    return response.status(200).send(findUser);
});

app.listen(port, () => {
    console.log(`Running on port value ${port}.`);
});
