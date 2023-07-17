import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useState } from "react";

const styles = {
  display: "flex",
  flexDirection: "column",
  width: "65vw",
  alignItems: "center",
  margin: "10px auto",
  gap: "8px",
};

const NoteForm = ({ noteFormRef, newNoteMutation }) => {
  const [newNote, setNewNote] = useState({
    content: "",
    publicNote: false,
    important: false,
  });

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote.content,
      important: newNote.important,
      public: newNote.publicNote,
    };
    noteFormRef.current.toggleVisibility();

    newNoteMutation.mutate(noteObject);
    // setAllNotes(
    //   allNotes.concat({ ...returnedNote.data[0], username: user.username })
    // );
    setNewNote({
      content: "",
      publicNote: false,
      important: false,
    });
  };

  const handleNoteChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewNote((prevNote) => {
      return { ...prevNote, [name]: type === "checkbox" ? checked : value };
    });
    console.log("note", newNote);
  };

  return (
    <form onSubmit={addNote} style={styles}>
      <TextField
        id="outlined-basic"
        label="New Note"
        name="content"
        multiline
        rows={4}
        variant="outlined"
        value={newNote.content}
        onChange={handleNoteChange}
        sx={{ width: "60vw" }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControlLabel
          control={<Checkbox />}
          label="Make note public"
          name="publicNote"
          onChange={handleNoteChange}
          checked={newNote.publicNote}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Make note important"
          name="important"
          onChange={handleNoteChange}
          checked={newNote.important}
        />
      </Box>
      <Button type="submit" variant="contained" size="small">
        Submit
      </Button>
    </form>
  );
};

export default NoteForm;
