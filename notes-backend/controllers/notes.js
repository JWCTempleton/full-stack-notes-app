const { pool } = require("../config");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(
        authorization.substring(7),
        process.env.SECRET
      );
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", async (req, res, next) => {
  try {
    const data = await pool.query(
      "SELECT n.*, u.user_id, u.username FROM notes n JOIN users u on n.user_id=u.user_id ORDER BY n.note_id DESC;"
    );

    if (data.rowCount == 0) {
      return res.status(404).send("No note exists");
    }

    return res.status(200).json({
      status: 200,
      message: "All notes",
      data: data.rows,
    });
  } catch (error) {
    console.log("ERROR:", error);
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM notes WHERE note_id=$1";
  const value = [id];

  try {
    const data = await pool.query(query, value);

    if (data.rowCount == 0) {
      return res.status(404).send("No note exists");
    }

    return res.status(200).json({
      status: 200,
      message: "Note",
      data: data.rows,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  // const query = "SELECT * FROM users where user_id=$1;";
  // const value = [req.decodedToken.id];

  const { content, important, public } = req.body;

  console.log("TOKEN", req.decodedToken);

  if (content === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  try {
    //   const data = await pool.query(query, value);

    //   if (data.rowCount == 0) {
    //     return res.status(404).send("User does not exist");
    //   }

    //   const user = data.rows[0];

    const noteQuery =
      "INSERT INTO  notes(content, important, public, user_id) VALUES($1,$2,$3,$4) RETURNING *;";
    const noteValues = [content, important, public, req.decodedToken.id];

    const noteData = await pool.query(noteQuery, noteValues);

    return res.status(201).json({
      status: 201,
      message: "Note added successfully",
      data: noteData.rows,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  const userId = req.decodedToken.id;
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM notes WHERE note_id=$1";
  const value = [id];
  console.log("TOKEN", req.decodedToken, id);

  try {
    const data = await pool.query(query, value);

    if (data.rowCount == 0) {
      return res.status(404).send("Note does not exist");
    }

    if (userId === data.rows[0].user_id) {
      const id = parseInt(req.params.id);
      const deleteQuery = "DELETE FROM notes where note_id=$1 returning *";
      const deleteValue = [id];
      try {
        const deleteData = await pool.query(deleteQuery, deleteValue);

        if (deleteData.rowCount === 0) {
          return res.status(404).send("Note does not exist");
        }
        return res.status(200).json({
          status: 200,
          message: "Note successfully deleted",
          data: deleteData.rows,
        });
      } catch (error) {
        return next(error);
      }
    } else {
      return res
        .status(404)
        .send("You don't have the authorization to complete that request");
    }
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  const userId = req.decodedToken.id;
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM notes WHERE note_id=$1;";
  const value = [id];

  const { important } = req.body;

  try {
    const data = await pool.query(query, value);

    if (data.rowCount == 0) {
      return res.status(404).send("Note does not exist");
    }
    if (userId === data.rows[0].user_id) {
      const updateQuery =
        "UPDATE notes set important=$1 where note_id=$2 RETURNING *";
      const updateValue = [important, id];

      const updateNote = await pool.query(updateQuery, updateValue);

      if (updateNote.rowCount === 0) {
        return res.status(404).send("Note was not updated");
      }
      return res.status(200).json({
        status: 200,
        message: "Note successfully updated",
        data: updateNote.rows,
      });
    } else {
      return res
        .status(404)
        .send("You don't have the authorization to complete that request");
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
