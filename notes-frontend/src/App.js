import "./App.css";
import { Box, Button } from "@mui/material";
import Note from "./components/Note";
import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import LoginForm from "./components/LoginForm";
import { noteService } from "./services/notes";
import { loginService } from "./services/login";

function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("user", user);
    } catch (exception) {
      alert("Wrong credentials");
    }
  };

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setAllNotes(initialNotes.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setAllNotes(allNotes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportance = (id) => {
    const note = allNotes.find((note) => note.id === id);
    const updatedNote = { ...note, important: !note.important };

    noteService.update(id, updatedNote).then((returnedNote) => {
      setAllNotes(
        allNotes.map((note) => (note.id !== id ? note : returnedNote))
      ).catch((error) => {
        alert(`The note '${note.content}' was already deleted from the server`);
        setAllNotes(allNotes.filter((note) => note.id !== id));
      });
    });
  };

  const handleDelete = (id) => {
    if (window.confirm(`Do you really want to delete this note?`)) {
      noteService.remove(id).then((returnedNote) => {
        setAllNotes(allNotes.filter((note) => note.id !== id));
      });
    }
  };

  const notesToDisplay = showAll
    ? allNotes
    : allNotes.filter((note) => note.important);

  return (
    <div className="App">
      <h1>Note App</h1>
      {user === null && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user !== null && (
        <NoteForm
          addNote={addNote}
          newNote={newNote}
          handleNoteChange={handleNoteChange}
        />
      )}
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
          color="secondary"
          onClick={() => setShowAll(!showAll)}
          sx={{ alignSelf: "center" }}
        >
          {showAll ? "Important" : "All"}
        </Button>
        {notesToDisplay.map((note) => {
          return (
            <Note
              key={note.note_id}
              note={note}
              toggleImportance={() => toggleImportance(note.id)}
              handleDelete={() => handleDelete(note.id)}
            />
          );
        })}
      </Box>
    </div>
  );
}

export default App;
