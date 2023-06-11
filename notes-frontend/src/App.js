import "./App.css";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 80,
  lineHeight: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function App() {
  const notes = [
    {
      id: 1,
      content: "Notes app working",
      important: true,
    },
    {
      id: 2,
      content: "React app",
      important: false,
    },
    {
      id: 3,
      content: "GET and POST are important methods of HTTP protocol",
      important: true,
    },
  ];
  return (
    <div className="App">
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          gap: 2,
          margin: "0 auto",
        }}
      >
        {notes.map((note) => {
          return (
            <Item key={note.id} elevation={6}>
              {`${note.content}`}
            </Item>
          );
        })}
      </Box>
    </div>
  );
}

export default App;
