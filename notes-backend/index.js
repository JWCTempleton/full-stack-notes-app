const express = require("express");
const app = express();

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
