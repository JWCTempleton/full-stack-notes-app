import "./App.css";
import { Box, Button, Typography } from "@mui/material";
import Note from "./components/Note";
import { useEffect, useState, useRef } from "react";
import NoteForm from "./components/NoteForm";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import { noteService } from "./services/notes";
import { useQuery, useQueryClient, useMutation } from "react-query";

function App() {
  const [showAll, setShowAll] = useState(true);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  const queryClient = useQueryClient();

  const newNoteMutation = useMutation(noteService.create, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("notes");
      queryClient.setQueryData(
        "notes",
        notes.concat([{ ...newNote[0], username: user.username }])
      );
    },
  });

  const updateNoteMutation = useMutation(noteService.update, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("notes");
      queryClient.setQueryData(
        "notes",
        notes.map((note) =>
          note.note_id !== newNote[0].note_id
            ? note
            : { ...newNote[0], username: user.username }
        )
      );
    },
  });

  const deleteNoteMutation = useMutation(noteService.remove, {
    onSuccess: (newNote) => {
      // queryClient.invalidateQueries("notes");
      const notes = queryClient.getQueryData("notes");
      queryClient.setQueryData(
        "notes",
        notes.filter((n) => n.note_id !== newNote[0].note_id)
      );
    },
  });

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

  const result = useQuery("notes", noteService.getAll, {
    refetchOnWindowFocus: false,
  });

  let allNotes = queryClient.getQueryData("notes");

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const handleShowImportance = () => {
    setShowAll(!showAll);
  };

  // const toggleImportance = (id) => {
  //   const note = notes.find((note) => note.note_id === id);
  //   const updatedNote = { ...note, important: !note.important };

  //   noteService
  //     .update(id, updatedNote)
  //     .then((returnedNote) => {
  //       return setAllNotes(
  //         allNotes.map((note) => (note.note_id !== id ? note : updatedNote))
  //       );
  //     })
  //     .catch((error) => {
  //       alert(`The note '${note.content}' was already deleted from the server`);
  //       setAllNotes(allNotes.filter((note) => note.note_id !== id));

  //       // console.log("ID", id);
  //       // console.log("ALL NOTES", allNotes);
  //     });
  // };

  // const handleDelete = (id) => {
  //   if (window.confirm(`Do you really want to delete this note?`)) {
  //     noteService.remove(id).then((returnedNote) => {
  //       setAllNotes(allNotes.filter((note) => note.note_id !== id));
  //     });
  //   }
  // };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteAppUser");
    setUser(null);
  };

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
              // allNotes={allNotes}
              // setAllNotes={setAllNotes}
              user={user}
              noteFormRef={noteFormRef}
              queryClient={queryClient}
              // notes={notes}
              newNoteMutation={newNoteMutation}
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
          onClick={handleShowImportance}
          sx={{ alignSelf: "center" }}
        >
          {showAll ? "Important" : "All"}
        </Button>
        {allNotes.map((note) => {
          return (
            <Note
              key={note.note_id}
              note={note}
              // toggleImportance={() => toggleImportance(note.note_id)}
              // handleDelete={() => handleDelete(note.note_id)}
              user={user}
              queryClient={queryClient}
              // notes={notes}
              updateNoteMutation={updateNoteMutation}
              deleteNoteMutation={deleteNoteMutation}
            />
          );
        })}
      </Box>
    </div>
  );
}

export default App;
