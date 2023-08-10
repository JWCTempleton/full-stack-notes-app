import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box pt={3} sx={{ minHeight: "80vh" }}>
      <Typography variant="h3">That page doesn't appear to exist</Typography>
      <Typography variant="h6">Here are some helpful links:</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link to="/">Home</Link>
        <Link to="/notes">Notes</Link>
      </Box>
    </Box>
  );
};

export default NotFound;
