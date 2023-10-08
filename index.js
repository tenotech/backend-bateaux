const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth")
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use(cookieSession({
    name: "session",
    keys: ["bateaux"],
    maxAge: 24 * 60 * 60 * 100
}));

// register regenerate & save after the cookieSession middleware initialization
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin:"https://bateaux.onrender.com",
    methods:"GET,POST,PUT,DELETE",
    credentials: true,
}))

app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server is running!")
})