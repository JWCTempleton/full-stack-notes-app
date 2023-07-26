import { userService } from "../services/user";
import { useQuery } from "react-query";
import { Box, Typography, CircularProgress } from "@mui/material";

const User = ({ user }) => {
  const result = useQuery(
    "userNotes",
    () => userService.getAllUserNotes(user),
    {
      refetchOnWindowFocus: false,
    }
  );
  if (result.isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <Typography>Loading...</Typography>
        <CircularProgress />
      </Box>
    );
  }
  console.log("USER BACKEND", result);
  return (
    <div>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {user.username}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total notes: {result.data.length}
        </Typography>
      </Box>
    </div>
  );
};

export default User;
