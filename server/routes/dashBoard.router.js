const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  //creating query
  const query = `SELECT * FROM "user"`;

  pool.query(query).
  then(dbRes => {
      console.log("db res is", dbRes.rows)
    res.send(dbRes.rows);
  }).catch((error) => {
    res.sendStatus(500).error.data;
  });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
