const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

dotenv.config();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const requestLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("---------");
  next();
};

app.use(requestLogger);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.get("/", (request, response) => {
//   response.send(`<h1>Hello World</h1>`);
// });

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

// app.post("/api/notes", (request, response) => {
//   const body = request.body;
//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }
//   const note = {
//     content: body.content,
//     important: body.important || false,
//     id: generateId(),
//   };
//   notes = notes.concat(note);
//   response.json(note);
// });

// app.get("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const note = notes.find((note) => note.id === id);

//   note ? response.json(note) : response.status(404).end();
// });

// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });

// app.delete("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
