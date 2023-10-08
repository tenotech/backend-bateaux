const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL_1 = "https://bateaux.onrender.com/home";
const CLIENT_URL_0 = "https://bateaux.onrender.com/";

router.get("/login/success", (req,res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            // cookie: req.cookies
            //jwt
        });
    }
});

router.get("/login/failed", (req,res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    });
});

router.get("/logout", (req,res) => {
    req.logout(function(err) {
        if (err) {
          // Handle the error, e.g., by sending an error response
          return res.status(500).json({ message: 'Logout failed' });
        }
        res.redirect(CLIENT_URL_0)
    });
});


router.get("/google",passport.authenticate("google", { scope:["profile"]}));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL_1,
    failureRedirect: "/login/failed",
}));

module.exports = router