import "./App.css";
import { Box, Button, Typography } from "@mui/material";
import Note from "./components/Note";
import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import { noteService } from "./services/notes";
import { loginService } from "./services/login";

function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    content: "",
    publicNote: false,
    important: false,
  });
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setAllNotes(initialNotes.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("user", user);
    } catch (exception) {
      alert("Wrong credentials");
    }
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote.content,
      important: newNote.important,
      public: newNote.publicNote,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setAllNotes(
        allNotes.concat({ ...returnedNote.data[0], username: user.username })
      );
      setNewNote({
        content: "",
        publicNote: false,
        important: false,
      });
    });
  };

  const handleNoteChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewNote((prevNote) => {
      return { ...prevNote, [name]: type === "checkbox" ? checked : value };
    });
    console.log("note", newNote);
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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteAppUser");
    setUser(null);
  };

  const notesToDisplay = showAll
    ? allNotes
    : allNotes.filter((note) => note.important);

  return (
    <div className="App">
      <h1>Note App</h1>
      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user && (
        <div sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Typography>{user.username} logged in</Typography>
            <Button
              onClick={handleLogout}
              type="submit"
              variant="text"
              size="small"
            >
              Logout
            </Button>
          </Box>
          <Toggleable buttonLabel="New Note">
            <NoteForm
              addNote={addNote}
              newNote={newNote.content}
              publicNote={newNote.publicNote}
              handleNoteChange={handleNoteChange}
              important={newNote.important}
            />
          </Toggleable>
        </div>
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
