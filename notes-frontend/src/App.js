import "./App.css";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
// import Note from "./components/Note";
import { useEffect, useState } from "react";
// import NoteForm from "./components/NoteForm";
// import LoginForm from "./components/LoginForm";
// import Toggleable from "./components/Toggleable";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Notes from "./components/Notes";
import User from "./components/User";
import SignUp from "./components/SignUp";
import { noteService } from "./services/notes";
import { userService } from "./services/user";
import { useQuery, useQueryClient } from "react-query";
import { Routes, Route, Link, Navigate } from "react-router-dom";

function App() {
  // const [showAll, setShowAll] = useState(true);
  const [user, setUser] = useState(null);

  // const noteFormRef = useRef();

  const queryClient = useQueryClient();

  // const newNoteMutation = useMutation(noteService.create, {
  //   onSuccess: (newNote) => {
  //     const notes = queryClient.getQueryData("notes");
  //     queryClient.setQueryData(
  //       "notes",
  //       notes.concat([{ ...newNote[0], username: user.username }])
  //     );
  //   },
  // });

  // const updateNoteMutation = useMutation(noteService.update, {
  //   onSuccess: (newNote) => {
  //     const notes = queryClient.getQueryData("notes");
  //     queryClient.setQueryData(
  //       "notes",
  //       notes.map((note) =>
  //         note.note_id !== newNote[0].note_id
  //           ? note
  //           : { ...newNote[0], username: user.username }
  //       )
  //     );
  //   },
  // });

  // const deleteNoteMutation = useMutation(noteService.remove, {
  //   onSuccess: (newNote) => {
  //     // queryClient.invalidateQueries("notes");
  //     const notes = queryClient.getQueryData("notes");
  //     queryClient.setQueryData(
  //       "notes",
  //       notes.filter((n) => n.note_id !== newNote[0].note_id)
  //     );
  //   },
  // });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
      userService.setToken(user.token);
    }
  }, []);

  const result = useQuery("notes", noteService.getAll, {
    refetchOnWindowFocus: false,
  });

  // let allNotes = queryClient.getQueryData("notes");

  if (result.isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <Typography>Loading...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  // const handleShowImportance = () => {
  //   setShowAll(!showAll);
  // };

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
    <Container>
      <div
        style={{
          width: "95vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link style={{ padding: "8px", textDecoration: "none" }} to="/">
            home
          </Link>
          <Link style={{ padding: "8px", textDecoration: "none" }} to="/notes">
            all notes
          </Link>
          {user && (
            <Link style={{ padding: "8px", textDecoration: "none" }} to="/user">
              user
            </Link>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <Typography>{user.username} logged in</Typography>
          ) : (
            <Link
              style={{ padding: "8px", textDecoration: "none" }}
              to="/login"
            >
              login
            </Link>
          )}
          {!user && (
            <Link
              style={{ padding: "8px", textDecoration: "none" }}
              to="/signup"
            >
              sign up
            </Link>
          )}
          {user && (
            <Button
              onClick={handleLogout}
              type="submit"
              variant="text"
              size="small"
              style={{ paddingLeft: "12px" }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
      <Routes>
        <Route
          path="/notes"
          element={<Notes user={user} queryClient={queryClient} />}
        />
        <Route
          path="/user"
          element={
            user ? (
              <User user={user} queryClient={queryClient} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
