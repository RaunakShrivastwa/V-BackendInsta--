import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";

passport.use(new FacebookStrategy({
    clientID:'707153834844156',
    clientSecret: 'c95c1054f77413cfd0efbe5ea530fea8',
    callbackURL: "http://localhost:8000/user/auth/facebook/callback",
    // profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      return done(null,profile)
  }
));

export default passport;