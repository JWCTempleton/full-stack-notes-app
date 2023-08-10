import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        maxWidth: "70vw",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" sx={{ pt: 4, pl: 3 }}>
        Welcome to the note app
      </Typography>
      <Typography sx={{ pl: 3, pt: 2 }}>
        This is a full stack app using a React front end, Material UI styling,
        Express server, and PostgreSQL database.
      </Typography>
      <Typography sx={{ pl: 3, pt: 1 }}>
        Clicking the All Notes tab will show all Public notes created by users.
      </Typography>
      <Typography sx={{ pl: 3, pt: 1 }}>
        Creating an account will allow you to create and save your own notes.
        Notes not marked Public are Private and will only be visible to you in
        the User tab.
      </Typography>
      <Typography sx={{ pl: 3, pt: 1 }}>
        Want to get started?
        <Link
          to="/login"
          style={{ paddingLeft: "6px", textDecoration: "none" }}
        >
          Click here to create an account
        </Link>
      </Typography>
    </div>
  );
};

export default Home;
