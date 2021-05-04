const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs")
const config = require("./utils/config");
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

app.use(cors());
app.use(express.json());
app.use(middleware.morgan(":method :url :status :res[content-length] - :response-time ms :payload"));

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app