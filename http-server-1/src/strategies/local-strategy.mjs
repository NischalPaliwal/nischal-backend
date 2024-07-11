import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
    console.log(`Inside Serialize User`);
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(`Inside Deserialize`);
    console.log(`Deserializing User ID: ${id}`);
    try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("User Not Found!");
    done(null, findUser);
    } catch(err) {
    done(err, null);
    }
});

export default passport.use(
    new Strategy({ usernameField: "name", passwordField: "password" }, (name, password, done) => {
    console.log(`Username: ${name}`);
    console.log(`Password: ${password}`);
        try {
        const findUser = mockUsers.find((user) => user.name === name);
        if (!findUser) throw new Error("User Not Found!");
        if(findUser.password !== password)
        throw new Error("Invalid Credentials!");
        done(null, findUser);
        } catch (err) {
        done(err, null);
        }
    })
);