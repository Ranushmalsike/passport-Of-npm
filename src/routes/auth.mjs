import express from "express";
import passport from "../strategies/local-strategies.mjs";

const router = express.Router();

// Login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

// Login page
router.get("/login", (req, res) => {
  res.send(`<form action="/auth/login" method="post">
              <label>Username:</label>
              <input type="text" name="username" required />
              <label>Password:</label>
              <input type="password" name="password" required />
              <button type="submit">Login</button>
            </form>`);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
