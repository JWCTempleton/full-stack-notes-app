import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { loginService } from "../services/login";
import { noteService } from "../services/notes";
import { userService } from "../services/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  //   const handleLogin = async (event) => {
  //     event.preventDefault();

  //     try {
  //       const user = await loginService.login({
  //         username,
  //         password,
  //       });

  //       window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));

  //       noteService.setToken(user.token);
  //       userService.setToken(user.token);
  //       setUser(user);
  //       setUsername("");
  //       setPassword("");
  //       console.log("user", user);
  //       navigate("/");
  //     } catch (exception) {
  //       alert("Wrong credentials");
  //     }
  //   };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    if (confirmPassword === password) {
      console.log("USER", { username, password, email });
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {alert === true && (
          <Alert variant="filled" severity="warning">
            The two passwords did not match.
          </Alert>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleCreateUser}
          noValidate
          sx={{
            mt: 1,
            mb: 4,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={({ target }) => setEmail(target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          />
          {confirmPassword.length > 0 && confirmPassword !== password ? (
            <TextField
              error
              fullWidth
              id="confirmPassword"
              label="Error"
              type="password"
              helperText="Passwords don't match."
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          ) : (
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={({ target }) => setConfirmPassword(target.value)}
            />
          )}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              justifySelf: "center",
            }}
          >
            Submit
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            {/* <Link href="#" variant="body2">
              Forgot password?
            </Link>
            <Link href="#" variant="body2">
              {"Sign Up"}
            </Link> */}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
