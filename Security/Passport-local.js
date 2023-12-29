import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../model/User.js'
import config from '../config/PasswordEncrypt.js'
const Decrypt = new config();
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, passport, done) {
        
        User.findOne({ email: email }).then(user => {
            
            if (!user || Decrypt.decryptText(user.password,'KeepCoding') != passport) {
                console.log("Invalide User !!!!!");
                return done(null, false);
            }
            return done(null, user);
        }).catch(err => {
            console.log("There is no user with UserName");
            return done(err);
        });
    }
));


passport.serializeUser(function (user, done) {
    return done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id).then(result => {
        return done(null, result);
    }).catch(err => {
        console.log("Error with finding ---> User");
        return done(err);
    });
});

// cheak the user Authentication
passport.cheakAuthentication = function (req, res, next) {
    // if user signed in
    if (req.isAuthenticated()) {
        return next();
    }
    return res.json({ Message: 'Pleace Login First' })
}

passport.setAunthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
}

export default passport;