const express = require("express");
const morgan = require("morgan");
const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");
const bookingRouter = require("./src/routes/bookingRouter");
const userRouter = require("./src/routes/userRoute");

const app = express();
app.use(express.json());

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
app.use("/api/", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
