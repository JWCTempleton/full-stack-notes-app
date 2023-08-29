import "./App.css";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Notes from "./components/Notes";
import User from "./components/User";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import { noteService } from "./services/notes";
import { userService } from "./services/user";
import { userCheck } from "./services/userCheck";
import { useQuery, useQueryClient } from "react-query";
import { Routes, Route, Link, Navigate } from "react-router-dom";

function App() {
  // const [showAll, setShowAll] = useState(true);
  const [user, setUser] = useState(null);

  const queryClient = useQueryClient();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteAppUser");
    window.localStorage.removeItem("loggedInTime");
    setUser(null);
  };

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
  //   const loggedIn = window.localStorage.getItem("loggedInTime");
  //   console.log("TIME", loggedIn);
  //   const expiredCredentials = Number(loggedIn) + 600000 * 6;

  //   if (loggedUserJSON && expiredCredentials < Date.now()) {
  //     handleLogout();
  //   } else if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUser(user);
  //     noteService.setToken(user.token);
  //     userService.setToken(user.token);
  //   }
  // }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    const user = JSON.parse(loggedUserJSON);
    console.log("USER", user);
    user && userCheck.setToken(user.token);
    user &&
      userCheck.checkUser().then((response) => {
        console.log("RESPONSE", response);
        if (response === undefined) {
          handleLogout();
        } else {
          setUser(user);
          noteService.setToken(user.token);
          userService.setToken(user.token);
        }
      });
  }, []);

  const result = useQuery("notes", noteService.getAll, {
    refetchOnWindowFocus: false,
  });

  // let allNotes = queryClient.getQueryData("notes");

  if (result.isLoading) {
    return (
      <Box
        sx={{
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

  return (
    <Container
      style={{
        maxWidth: "90vw",
        overflow: "none",
        padding: 0,
        margin: "0 auto",
      }}
    >
      <div
        style={{
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
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
