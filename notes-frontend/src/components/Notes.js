import { useMutation } from "react-query";
import { Box, Button } from "@mui/material";
import { useState, useRef } from "react";
import { noteService } from "../services/notes";
import Toggleable from "./Toggleable";
import NoteForm from ".//NoteForm";
import Note from "./Note";

const Notes = ({ user, queryClient }) => {
  const [showAll, setShowAll] = useState(true);

  const noteFormRef = useRef();

  let allNotes = queryClient.getQueryData("notes");

  let filteredNotes = showAll
    ? allNotes
    : allNotes.filter((n) => n.important === true);

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
      const notes = queryClient.getQueryData("notes");
      queryClient.setQueryData(
        "notes",
        notes.filter((n) => n.note_id !== newNote[0].note_id)
      );
    },
  });

  const handleShowImportance = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <h1>Note App</h1>
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
            <Toggleable buttonLabel="New Note" ref={noteFormRef}>
              <NoteForm
                user={user}
                noteFormRef={noteFormRef}
                queryClient={queryClient}
                newNoteMutation={newNoteMutation}
              />
            </Toggleable>
          </Box>
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

export default Notes;
