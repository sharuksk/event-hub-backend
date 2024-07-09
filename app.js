const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");
const bookingRouter = require("./src/routes/bookingRouter");
const userRouter = require("./src/routes/userRoute");

const typesRouter = require("./src/routes/typesRouter");
const itemsRouter = require("./src/routes/itemsRouter");

const clientRouter = require("./src/routes/clientRouter");
const calendarRouter = require("./src/routes/calendarRouter");

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );
app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1/", bookingRouter);
app.use("/api/v1/", userRouter);

app.use("/api/v1/types", typesRouter);
app.use("/api/v1/items", itemsRouter);

app.use("/api/v1/", clientRouter);
app.use("/api/v1/", calendarRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
