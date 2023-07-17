import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState, useRef } from "react";

const Notes = ({ user }) => {
  const noteFormRef = useRef();

  return (
    <div>
      <h1>Note App</h1>
      {/* {!user && <LoginForm setUser={setUser} />} */}
      {user && (
        <div sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              margin: "0 auto",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/* <Typography>{user.username} logged in</Typography> */}
            <Button
              onClick={handleLogout}
              type="submit"
              variant="text"
              size="small"
            >
              Logout
            </Button>
          </Box>
          <Toggleable buttonLabel="New Note" ref={noteFormRef}>
            <NoteForm
              user={user}
              noteFormRef={noteFormRef}
              queryClient={queryClient}
              newNoteMutation={newNoteMutation}
            />
          </Toggleable>
        </div>
      )}
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          width: "65vw",
          gap: 3,
          margin: "0 auto",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleShowImportance}
          sx={{ alignSelf: "center" }}
        >
          {showAll ? "Important" : "All"}
        </Button>
        {allNotes.map((note) => {
          return (
            <Note
              key={note.note_id}
              note={note}
              user={user}
              queryClient={queryClient}
              updateNoteMutation={updateNoteMutation}
              deleteNoteMutation={deleteNoteMutation}
            />
          );
        })}
      </Box>
    </div>
  );
};
