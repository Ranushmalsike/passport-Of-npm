import express from "express";
import session from "express-session";
import passport from "./strategies/local-strategies.mjs";
import authRoutes from "./routes/auth.mjs";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "abcd12355",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
  res.send(`<h1>Welcome ${req.isAuthenticated() ? req.user.username : "Guest"}!</h1>`);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
