import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { initializeDb } from "./config/data-source.js";
import { productsRouter } from "./routes/products.router.js";

const port = process.env.APP_PORT || 3000;

await initializeDb();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use("/api/products", productsRouter);

app.listen(port, () => console.log(`App started on port ${port}`));
