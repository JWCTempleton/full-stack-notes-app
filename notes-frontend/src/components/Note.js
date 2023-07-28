import { styled } from "@mui/material/styles";
import { Button, Typography, Paper, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  lineHeight: "60px",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  padding: "25px 16px",
  gap: "6px",
}));

const Note = ({ note, user, updateNoteMutation, deleteNoteMutation }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleImportance = async (note) => {
    // const updateNote = notes.find((note) => note.note_id === id);
    const updatedNote = { ...note, important: !note.important };

    updateNoteMutation.mutate(updatedNote);
  };

  const handleDelete = async (note) => {
    // noteService.remove(id).then((returnedNote) => {
    //   setAllNotes(allNotes.filter((note) => note.note_id !== id));
    // });
    deleteNoteMutation.mutate(note);
    setOpen(false);
  };

  return (
    <Item key={note.note_id} elevation={6}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "left" }}
      >{`${note.content}`}</Typography>
      <Typography>{`Created by: ${note.username}`}</Typography>

      {user && user.username === note.username && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => toggleImportance(note)}
            >
              {note.important ? "Important" : "Unimportant"}
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={handleClickOpen}
            >
              Delete
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this note?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Deleting this note will be permanent.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => handleDelete(note)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box sx={{ alignSelf: "flex-end" }}>
            {note.public ? (
              <Typography sx={{ justifySelf: "flex-end" }}>public</Typography>
            ) : (
              <Typography>private</Typography>
            )}
          </Box>
        </Box>
      )}
    </Item>
  );
};

export default Note;
