const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const noteRouter = require("./controllers/notes");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

dotenv.config();

app.use(express.static(path.join(__dirname, "build")));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use(middleware.requestLogger);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/notes", noteRouter);

// app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
