import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/User.js';

const sessionMiddleware = session({ secret: 'your_secret_key', resave: false, saveUninitialized: true });

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, { message: 'Incorrect email.' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export { sessionMiddleware, passport };