import { styled } from "@mui/material/styles";
import { Button, Typography, Paper, Box } from "@mui/material";

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

const Note = ({
  note,
  // handleDelete,
  user,
  updateNoteMutation,
  deleteNoteMutation,
}) => {
  // const updateNoteMutation = useMutation(noteService.update, {
  //   onSuccess: (newNote) => {
  //     queryClient.invalidateQueries("notes");
  //     console.log("NEW DATA", newNote);
  //   },
  // });

  const toggleImportance = async (note) => {
    // const updateNote = notes.find((note) => note.note_id === id);
    // console.log("UPDATE", notes);
    const updatedNote = { ...note, important: !note.important };

    updateNoteMutation.mutate(updatedNote);

    // console.log("ALL NOTES", allNotes);
  };

  const handleDelete = async (note) => {
    if (window.confirm(`Do you really want to delete this note?`)) {
      // noteService.remove(id).then((returnedNote) => {
      //   setAllNotes(allNotes.filter((note) => note.note_id !== id));
      // });
      deleteNoteMutation.mutate(note);
    }
  };

  return (
    <Item key={note.note_id} elevation={6}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "left" }}
      >{`${note.content}`}</Typography>
      <Typography>{`Created by: ${note.username}`}</Typography>

      {user && user.username === note.username && (
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
            onClick={() => handleDelete(note)}
          >
            Delete
          </Button>
        </Box>
      )}
    </Item>
  );
};

export default Note;
