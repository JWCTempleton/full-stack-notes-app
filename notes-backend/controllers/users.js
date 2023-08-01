const { pool } = require("../config");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
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
      "SELECT user_id, username, email, admin FROM users;"
    );

    if (data.rowCount == 0) {
      return res.status(404).send("No user exists");
    }

    return res.status(200).json({
      status: 200,
      message: "All users",
      data: data.rows,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const userNoteQuery =
      "SELECT n.*, u.user_id, u.username FROM notes n JOIN users u on n.user_id=u.user_id WHERE u.user_id=$1 ORDER BY n.note_id DESC;";
    const value = [req.decodedToken.id];

    const data = await pool.query(userNoteQuery, value);
    // if (data.rowCount == 0) {
    //   return res.status(404).send("No notes exist");
    // }

    return res.status(200).json({
      status: 200,
      message: "All user notes",
      data: data.rows,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const query =
    "INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *;";
  const values = [username, passwordHash, email];

  try {
    const data = await pool.query(query, values);

    return res.status(201).json({
      status: 201,
      message: "User added successfully",
      data: data.rows,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
