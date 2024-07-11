import Router from "express";
const router = Router();

router.get("/users", (request, response) => {
    console.log(request.headers.cookie);
    console.log(request.cookies);
    console.log(request.signedCookies.hello);
    response.send([{id: 1, username: "nischal", displayName: "Nischal"},
        {id: 2, username: "jack", displayName: "Jack"},
        {id: 3, username: "shane", displayName: "Shane"}
    ])
});

export default router;

