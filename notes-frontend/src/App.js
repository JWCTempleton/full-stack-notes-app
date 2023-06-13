import "./App.css";
import { Box, Button } from "@mui/material";
import Note from "./components/Note";
import { useState } from "react";
import NoteForm from "./components/NoteForm";

const notes = [
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

function App() {
  const [allNotes, setAllNotes] = useState(notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    setAllNotes(allNotes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log("note:", event.target.value);
    setNewNote(event.target.value);
  };

  const notesToDisplay = showAll
    ? allNotes
    : allNotes.filter((note) => note.important);

  return (
    <div className="App">
      <h1>Note App</h1>
      <NoteForm
        addNote={addNote}
        newNote={newNote}
        handleNoteChange={handleNoteChange}
      />
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          width: "65vw",
          gap: 3,
          margin: "0 auto",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setShowAll(!showAll)}
          sx={{ alignSelf: "center" }}
        >
          {showAll ? "Filter Important" : "Show All"}
        </Button>
        {notesToDisplay.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </Box>
    </div>
  );
}

export default App;
