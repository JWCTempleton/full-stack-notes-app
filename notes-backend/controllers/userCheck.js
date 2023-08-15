const { pool } = require("../config");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
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

router.get("/", tokenExtractor, async (req, res, next) => {
  if (req.decodedToken) {
    try {
      const query = "SELECT username from users WHERE user_id=$1;";
      const values = [req.decodedToken.id];

      const noteData = await pool.query(query, values);

      return res.status(201).json({
        status: 201,
        message: "valid",
        data: noteData.rows,
      });
    } catch (error) {
      console.log("AUTHENTICATION ERROR");
    }
  }
});

module.exports = router;
