import "./App.css";
import { Box, Button, Typography } from "@mui/material";
import Note from "./components/Note";
import { useEffect, useState, useRef } from "react";
import NoteForm from "./components/NoteForm";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import { noteService } from "./services/notes";
import { useQuery } from "react-query";

function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  // useEffect(() => {
  //   noteService.getAll().then((initialNotes) => setAllNotes(initialNotes.data));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const result = useQuery("notes", () =>
    noteService.getAll().then((res) => setAllNotes(res.data))
  );

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const toggleImportance = (id) => {
    const note = allNotes.find((note) => note.note_id === id);
    const updatedNote = { ...note, important: !note.important };

    noteService
      .update(id, updatedNote)
      .then((returnedNote) => {
        return setAllNotes(
          allNotes.map((note) => (note.note_id !== id ? note : updatedNote))
        );
      })
      .catch((error) => {
        alert(`The note '${note.content}' was already deleted from the server`);
        setAllNotes(allNotes.filter((note) => note.note_id !== id));

        // console.log("ID", id);
        // console.log("ALL NOTES", allNotes);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm(`Do you really want to delete this note?`)) {
      noteService.remove(id).then((returnedNote) => {
        setAllNotes(allNotes.filter((note) => note.note_id !== id));
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
      {!user && <LoginForm setUser={setUser} />}
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
          <Toggleable buttonLabel="New Note" ref={noteFormRef}>
            <NoteForm
              // addNote={addNote}
              // newNote={newNote.content}
              // publicNote={newNote.publicNote}
              // handleNoteChange={handleNoteChange}
              // important={newNote.important}
              allNotes={allNotes}
              setAllNotes={setAllNotes}
              user={user}
              noteFormRef={noteFormRef}
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
              toggleImportance={() => toggleImportance(note.note_id)}
              handleDelete={() => handleDelete(note.note_id)}
              user={user}
            />
          );
        })}
      </Box>
    </div>
  );
}

export default App;
