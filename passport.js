const passport = require('passport');
require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //see LAMA and passport.js docs
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    
    done(null, profile);

    //using mongodb something like this:
    // const user = {
    //     username: profile.displayName,
    //     avatar: profile.photos[0],
    // };
    // user.save();

    }
));

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user, done) => {
  done(null, user);
});