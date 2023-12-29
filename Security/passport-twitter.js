import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import crypto from 'crypto';
import User from '../model/User.js';

passport.use(new TwitterStrategy({
  consumerKey: '9swUbFOhDBcufGsiAWuQWaWdA',
  consumerSecret: 'KQGYNFadMuXC2A8WaAtIyWorm2EKGfpYKrN1vbzHqMbia1BHnS',
  callbackURL: 'http://localhost:8000/user/auth/twitter/callback'

},
  async function (token, tokenSecret, profile, done) {
    try {
      const exist = await User.findOne({ name:profile.displayName });
      if (exist) {
          return done(null,exist);
      }
      else{
        const user = {
          name: profile.displayName,
          email:profile.username,
          password: crypto.randomBytes(20).toString('hex'),
          avtar: profile.photos[0].value
        }
        const data = await User.create(user);
        console.log("Account Created ",data);
        return done(null, user);
      }
    } catch (err) {
      return console.log("There is Error ", err);
    }

  }
))


export default passport;
