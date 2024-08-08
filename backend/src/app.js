require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { initializeDb } = require("./config/data-source");

const { productsRouter } = require("./routes/products.router");
const { errorHandler } = require("./middlewares/error-handler.middleware");

const port = process.env.APP_PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productsRouter);

app.use(errorHandler);

async function start() {
  await initializeDb();

  app.listen(port, () => console.log(`App started on port ${port}`));
}

start();
