import { Router } from "express";
const router = Router();

// cookie-parser => npm i cookie-parser

router.get("/users", (request, response) => {
    console.log(request.headers.cookie);
    console.log(request.cookies);
    response.send([{id: 1, username: "nischal", displayName: "Nischal"},
        {id: 2, username: "jack", displayName: "Jack"},
        {id: 3, username: "shane", displayName: "Shane"}
    ])
});

export default router;

