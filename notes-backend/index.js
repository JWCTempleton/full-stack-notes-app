const express = require("express");
const app = express();

app.use(express.json());

const requestLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("---------");
  next();
};

app.use(requestLogger);

let notes = [
  {
    id: 1,
    content: "Notes app working",
    important: true,
    user: "JWCT",
  },
  {
    id: 2,
    content: "React app",
    important: false,
    user: "JWCT",
  },
  {
    id: 3,
    content: "GET and POST are important methods of HTTP protocol",
    important: true,
    user: "John Doe",
  },
];

app.get("/", (request, response) => {
  response.send(`<h1>Hello World</h1>`);
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };
  notes = notes.concat(note);
  response.json(note);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  note ? response.json(note) : response.status(404).end();
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
