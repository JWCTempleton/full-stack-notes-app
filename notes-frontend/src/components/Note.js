import { styled } from "@mui/material/styles";

import { Button, Typography, Paper } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 80,
  lineHeight: "60px",
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  padding: "25px 16px",
  gap: "6px",
}));

const Note = ({ note }) => {
  return (
    <Item key={note.id} elevation={6}>
      <Typography sx={{ fontWeight: "bold" }}>{`${note.content}`}</Typography>
      <Typography>{`Created by: ${note.user}`}</Typography>
      <Button variant="contained" size="small">
        {note.important ? "Important" : "Unimportant"}
      </Button>
    </Item>
  );
};

export default Note;
