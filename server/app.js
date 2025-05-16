const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");
const cors = require("cors");
const router = require("./app/router/userRoutes");
const connectDB = require("./app/config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const app = express();

dotenv.config();

connectDB();

// CORS setup (Ensure .env has FRONTEND_HOST=http://localhost:3000)
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

// Cookie & session
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
app.use(cookieParser());

// ✅ Static folders - Clean approach
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
app.use(express.static('public'));


// API Routes
const apiPropertyRouter = require("./app/router/apiPropertyRoute");
app.use("/api", apiPropertyRouter);

const adminRoute = require("./app/router/routing");
app.use(adminRoute);

app.use("/api", router);

const bookingRoute=require("./app/router/bookingRoutes")
app.use("/booked",bookingRoute)

// Server start
app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
