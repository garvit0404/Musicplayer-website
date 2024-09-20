const express = require("express");
const path = require("path");
const hbs = require("hbs");
const User = require("./config/mongodb");
const app = express();
const mongoose = require("mongoose");

// Middleware to parse form data (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (if needed)
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/login-signup")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

// Set view engine to hbs
app.set("view engine", "hbs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Register the partials directory (optional, for reusable components like headers/footers)
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Serve static files (CSS, JS, images)
app.use("/home", express.static(path.join(__dirname, "./home")));
app.use("/music", express.static(path.join(__dirname, "music")));
app.use(
  "/music-images",
  express.static(path.join(__dirname, "./music-images"))
);

app.use("/js", express.static(path.join(__dirname, "./js")));

app.get("/", (req, res) => {
    res.render("index");
  });

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// Registration Route
app.post("/register", async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.send("User already registered. Please log in.");
    }

    // Create a new user and save it to the database
    const newUser = new User({ email, phone, password });
    await newUser.save();

    // Redirect to music.html after successful registration
    res.redirect("/music");
  } catch (error) {
    res.status(500).send("Error registering user.");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and validate password
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      console.log("Login successful");
      // Redirect to music.html after successful login
      res.redirect("/music");
    } else {
      // Display error message if login fails
      res.send("Invalid email or password. Please check or register.");
    }
  } catch (error) {
    res.status(500).send("Error logging in.");
  }
});

// Music Page Route
app.get("/music", (req, res) => {
  res.render("music");
});

app.listen(3000, () => {
  console.log("port connect ho gya hai");
});
