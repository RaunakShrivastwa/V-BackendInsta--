import passport from 'passport';
import {OAuth2Strategy as  GoogleAuthStratgey} from 'passport-google-oauth';
import crypto from 'crypto';
import User from '../model/User.js';

passport.use(new GoogleAuthStratgey({
    clientID: '849197842335-bdmpis96skh3v7pdoo1jm2oan4d8d4su.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/user/auth/google/callback'

},
function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOne({ email: profile.emails[0].value }).then(user => {
        
        console.log(profile)
        console.log(profile.photos[0].value)
        if (user) {
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                avtar: profile.photos[0].value
                
            }).then(user => {
                return done(null, user);
            }).catch(err => {
                console.log("There is problem with Creation User", err);
                return;
            })
        }
    }).catch(err => {
        console.log("there is problem with finding user in google oauth", err);
        return;
    })
}
))


export default passport;
