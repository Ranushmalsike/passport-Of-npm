import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usermokup } from "../utilities/usermokup.mjs";

// Helper functions
const getUserByUsername = (username) => {
  return usermokup.find((user) => user.username === username);
};

const getUserById = (id) => {
  return usermokup.find((user) => user.id === id);
};

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = getUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }

    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  })
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  const user = getUserById(id);
  done(null, user || false);
});

export default passport;
