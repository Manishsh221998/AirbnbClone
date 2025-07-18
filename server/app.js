const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");
const cors = require("cors");
const router = require("./app/router/userRoutes");
const connectDB = require("./app/config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash"); // ✅ Import flash

const app = express();

dotenv.config();
connectDB();

// CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    credentials: true,
  })
);

// View engine
app.set("view engine", "ejs");
app.set("views", "views");

// Body parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Session (Required before flash)
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// ✅ Connect flash
app.use(flash());

// ✅ Flash messages setup (to make them available in EJS)
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use(cookieParser());

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static('public'));

// Routes
app.use("/api", require("./app/router/apiPropertyRoute"));
app.use(require("./app/router/routing"));
app.use("/api", router);
app.use("/booked", require("./app/router/bookingRoutes"));

// Start server
app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
