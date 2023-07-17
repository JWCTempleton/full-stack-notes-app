import { Typography } from "@mui/material";

const styles = {
  width: "100vw",
  height: "40px",
  padding: "20px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Footer = () => {
  return (
    <footer style={styles}>
      <Typography variant="subtitle1">Created by JWCTDesigns</Typography>
    </footer>
  );
};

export default Footer;
