import { useMutation, useQuery } from "react-query";
import { userService } from "../services/user";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { noteService } from "../services/notes";
import { useState, useRef } from "react";
import Note from "./Note";
import Toggleable from "./Toggleable";
import NoteForm from ".//NoteForm";

const User = ({ user, queryClient }) => {
  const [showAll, setShowAll] = useState(true);

  const noteFormRef = useRef();

  const result = useQuery(
    "userNotes",
    () => userService.getAllUserNotes(user),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const newNoteMutation = useMutation(noteService.create, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("userNotes");
      queryClient.setQueryData(
        "userNotes",
        // notes.concat([{ ...newNote[0], username: user.username }])
        [{ ...newNote[0], username: user.username }, ...notes]
      );
      if (newNote[0].public === true) {
        const allNotes = queryClient.getQueryData("notes");
        queryClient.setQueryData("notes", [
          { ...newNote[0], username: user.username },
          ...allNotes,
        ]);
      }
    },
  });

  const updateNoteMutation = useMutation(noteService.update, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("userNotes");
      queryClient.setQueryData(
        "userNotes",
        notes.map((note) =>
          note.note_id !== newNote[0].note_id
            ? note
            : { ...newNote[0], username: user.username }
        )
      );
      if (newNote[0].public === true) {
        const allNotes = queryClient.getQueryData("notes");
        queryClient.setQueryData(
          "notes",
          allNotes.map((note) =>
            note.note_id !== newNote[0].note_id
              ? note
              : { ...newNote[0], username: user.username }
          )
        );
      }
    },
  });

  const deleteNoteMutation = useMutation(noteService.remove, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("userNotes");
      queryClient.setQueryData(
        "userNotes",
        notes.filter((n) => n.note_id !== newNote[0].note_id)
      );
      if (newNote[0].public === true) {
        const allNotes = queryClient.getQueryData("notes");
        queryClient.setQueryData(
          "notes",
          allNotes.filter((n) => n.note_id !== newNote[0].note_id)
        );
      }
    },
  });

  const handleShowImportance = () => {
    setShowAll(!showAll);
  };

  let filteredNotes = showAll
    ? result.data
    : result.data.filter((n) => n.important === true);

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
  console.log("USER BACKEND", result);
  return (
    <div>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {user.username}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total notes: {result.data.length}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Toggleable buttonLabel="New Note" ref={noteFormRef}>
          <NoteForm
            user={user}
            noteFormRef={noteFormRef}
            queryClient={queryClient}
            newNoteMutation={newNoteMutation}
          />
        </Toggleable>
      </Box>
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
        {
          (result.data = undefined && (
            <Typography>No notes to display</Typography>
          ))
        }
        {filteredNotes.map((note) => {
          return (
            <Note
              key={note.note_id}
              note={note}
              user={user}
              queryClient={queryClient}
              updateNoteMutation={updateNoteMutation}
              deleteNoteMutation={deleteNoteMutation}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default User;
