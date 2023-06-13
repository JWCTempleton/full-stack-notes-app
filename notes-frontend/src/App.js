import "./App.css";
import Box from "@mui/material/Box";
import Note from "./components/Note";

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
          return <Note note={note} />;
        })}
      </Box>
    </div>
  );
}

export default App;
