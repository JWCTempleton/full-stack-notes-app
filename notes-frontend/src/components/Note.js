import { styled } from "@mui/material/styles";

import { Button, Typography, Paper } from "@mui/material";

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

const Note = ({ note, toggleImportance }) => {
  return (
    <Item key={note.id} elevation={6}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", textAlign: "left" }}
      >{`${note.content}`}</Typography>
      <Typography>{`Created by: ${note.user}`}</Typography>
      <Button variant="outlined" size="small" onClick={toggleImportance}>
        {note.important ? "Important" : "Unimportant"}
      </Button>
    </Item>
  );
};

export default Note;
