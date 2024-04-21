const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
const campgrounds = require("./routes/campgrounds");
const auth = require("./routes/auth");
const appointment = require("./routes/appointments");
const transaction = require("./routes/transactions");
const transactionslip = require("./routes/transactionslips");

const app = express();

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

// Body parser
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Cookie parser
app.use(cookieParser());

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
  windowMS: 10 * 60 * 1000,
  max: 1000,
});
app.use(limiter);
app.use(hpp());
app.use(cors());

// Mount routers
app.use("/api/v1/campgrounds", campgrounds);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointment);
app.use("/api/v1/transactions", transaction);
app.use("/api/v1/transactionslips", transactionslip);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    "Server is running in",
    process.env.NODE_ENV,
    "on" + process.env.HOST + ":" + PORT
  )
);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CBS API",
      version: "1.0.0",
      description: "Campground Booking System of Capybara",
    },
    server: [
      {
        url: process.env.HOST + ":" + PORT + "/api/v1",
      },
    ],
  },
};

// Handle unhandles promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
