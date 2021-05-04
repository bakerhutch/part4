const mongoose = require("mongoose");
const config = require("../utils/config")
const logger = require("../utils/logger")

//To another worker? Lines 4-18
const mongoUrl = config.MONGODB_URI;

//Need to move below logging to ../utils/logger.js
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then((result) => {
  logger.info("connected to MongoDB");
})
.catch((error) => {
  logger.info("error connecting to MongoDB:", error.message);
});

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

module.exports = mongoose.model("Blog", blogSchema);