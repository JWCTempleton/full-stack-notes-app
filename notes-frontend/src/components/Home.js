import { Typography } from "@mui/material";

const Home = () => {
  return (
    <div
      style={{ minHeight: "85vh", display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h5" sx={{ pt: 4, pl: 3 }}>
        Welcome to the note app
      </Typography>
    </div>
  );
};

export default Home;
