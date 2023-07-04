import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";

const styles = {
  display: "flex",
  flexDirection: "column",
  width: "65vw",
  alignItems: "center",
  margin: "10px auto",
  gap: "8px",
};

const NoteForm = ({
  addNote,
  newNote,
  handleNoteChange,
  publicNote,
  important,
}) => {
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
          checked={publicNote}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Make note important"
          name="important"
          onChange={handleNoteChange}
          checked={important}
        />
      </Box>
      <Button type="submit" variant="contained" size="small">
        Submit
      </Button>
    </form>
  );
};

export default NoteForm;
