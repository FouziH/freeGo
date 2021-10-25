const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");

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
    console.log("GET error is", error);
    res.sendStatus(500).json({ msg: "There was an error" });
  }
});

router.get("/MplsAPi", async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2021/FeatureServer/0/query?where=1%3D1&outFields=publicaddress,reportedDate,beginDate,offense,description,UCRCode,centergbsid,centerLong,centerLat,centerX,centerY,neighborhood,lastchanged,LastUpdateDateETL&resultRecordCount=10&outSR=4326&f=json",
    });

    console.log("GET OPEN Minneapolis API response is", response.data.features);

    res.send(response.data.features)
    
  } catch (error) {
    console.log("GET OPEN Minneapolis API error is", error)
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
