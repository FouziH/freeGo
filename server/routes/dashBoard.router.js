const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


/**
 * GET route template
 */
router.get("/", async (req, res) => {
  //creating query
  try {
        const query = `
        SELECT 
            h.id, h.approved,h.name, h.city, h.state, h.street, h.zip, h.threat_level, h.latitude, h.longitude, h.image, genre.title, genre.description 
        FROM 
            "hazard" as h
        LEFT JOIN 
            "hazard_genre" as genre ON genre.id = h.genre_id;`;

        const response = await pool.query(query);

        console.log("db res is", response.rows);
        res.send(response.rows);
      
  } catch (error) {
      console.log("GET error is", error)
      res.sendStatus(500).json({msg: "There was an error"})
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
