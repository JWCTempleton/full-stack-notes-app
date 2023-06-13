import { TextField, Button } from "@mui/material";

const styles = {
  display: "flex",
  flexDirection: "column",
  width: "50vw",
  alignItems: "center",
  margin: "10px auto",
  gap: "8px",
};

const NoteForm = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <form onSubmit={addNote} style={styles}>
      <TextField
        id="outlined-basic"
        label="New Note"
        variant="outlined"
        value={newNote}
        onChange={handleNoteChange}
        sx={{ width: "40vw" }}
      />
      <Button type="submit" variant="contained" size="small">
        Submit
      </Button>
    </form>
  );
};

export default NoteForm;
