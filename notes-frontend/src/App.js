import "./App.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";

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

function App() {
  const notes = [
    {
      id: 1,
      content: "Notes app working",
      important: true,
      user: "JWCT",
    },
    {
      id: 2,
      content: "React app",
      important: false,
      user: "JWCT",
    },
    {
      id: 3,
      content: "GET and POST are important methods of HTTP protocol",
      important: true,
      user: "John Doe",
    },
  ];
  return (
    <div className="App">
      <h1>Note App</h1>
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          gap: 3,
          margin: "0 auto",
        }}
      >
        {notes.map((note) => {
          return (
            <Item key={note.id} elevation={6}>
              <Typography
                sx={{ fontWeight: "bold" }}
              >{`${note.content}`}</Typography>
              <Typography>{`Created by: ${note.user}`}</Typography>
              <Button variant="contained" size="small">
                important
              </Button>
            </Item>
          );
        })}
      </Box>
    </div>
  );
}

export default App;
