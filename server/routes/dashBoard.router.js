const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");

/**
 * GET route template
 */
router.get("/", async (req, res) => {
  try {
    //creating query
    const query = `
        SELECT 
        h.id, h.approved,h.name, h.description, h.city, h.state, h.street, h.zip, h.threat_level, h.latitude, h.longitude, h.created_date, TO_CHAR(h.created_date, 'Month'), h.image, genre.title, genre.description , h.user_id
        FROM 
            "hazard" as h
        LEFT JOIN 
            "hazard_genre" as genre ON genre.id = h.genre_id
        WHERE acos(
          sin(radians($1)) 
            * sin(radians(h.latitude)) 
            + cos(radians($1)) 
            * cos(radians(h.latitude)) 
            * cos( radians($2)
            - radians(h.longitude))
          ) * 3961 <= 500
          AND
          LOWER(h.threat_level) LIKE LOWER($3)
          AND 
          LOWER(genre.title) LIKE LOWER($4)
          AND 
         LOWER(h.description) LIKE LOWER($5)
          AND
          h.created_date between $6 and $7;`; // <-- 383 is the amount of miles we are asking for change at your discreation

    let genreTitle = "%";
    let threat_level = "%";
    let userLat = "%";
    let userLong = "%";
    let startDate = '2010-01-01';
    let endDate = '2090-01-01';
    let description = "%";

    if(JSON.parse(req.query.filterParams).date) {
      console.log('JSON.parse(req.query.filterParams).date', JSON.parse(req.query.filterParams).date);
      JSON.parse(req.query.filterParams).date?.map((postData) => {
        startDate = postData.startDate;
        endDate = postData.endDate;
      })
    }

    if (JSON.parse(req.query.filterParams).description) {
      description = JSON.parse(req.query.filterParams).description + "%";
    }

    if (JSON.parse(req.query.filterParams).threat_Level) {
      threat_level = JSON.parse(req.query.filterParams).threat_Level + "%";
    }

    if (JSON.parse(req.query.filterParams).threat_Level) {
      threat_level = JSON.parse(req.query.filterParams).threat_Level + "%";
    }

    if (JSON.parse(req.query.filterParams).userLatLng) {
     userLat = JSON.parse(req.query.filterParams).userLatLng.latitude;
    }

    if ( JSON.parse(req.query.filterParams).userLatLng) {
     userLong = JSON.parse(req.query.filterParams).userLatLng.longitude;
    }

    if ( JSON.parse(req.query.filterParams).latitude) {
      userLat = JSON.parse(req.query.filterParams).latitude;
    }

    if ( JSON.parse(req.query.filterParams).longitude) {
     userLong = JSON.parse(req.query.filterParams).longitude;
    }

    const dbData = await pool.query(query, [
      userLat,
      userLong,
      threat_level,
      genreTitle,
      description,
      startDate,
      endDate,
    ]);
    
    //Making axios get request to open Minneapolis Api
    const openApiData = await axios.get(
      "https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2021/FeatureServer/0/query?where=1%3D1&outFields=publicaddress,reportedDate,beginDate,offense,description,UCRCode,centergbsid,centerLong,centerLat,centerX,centerY,neighborhood,lastchanged,LastUpdateDateETL&resultRecordCount=50&outSR=4326&f=json"
    );

    const data = dbData.rows;

    // console.log('dbdata', data);

    const openDataApi = openApiData.data.features;
    let ODAPIDMODIFIED = [];

    openDataApi.map((item) => {
      ODAPIDMODIFIED.push({
        approved: true,
        name: item.attributes.description,
        city: "Minneapolis",
        state: "mn",
        street: item.attributes.publicaddress,
        zip: "",
        treat_level: "",
        latitude: item.attributes.centerLat,
        longitude: item.attributes.centerLong,
        created_date: "",
        image: "https://picsum.photos/200/300",
        title: item.attributes.description,
        description: item.attributes.description,
        user_id: 1,
      });
    });

    // let dbRes = [...data, ...ODAPIDMODIFIED];
    let dbRes = [...data];

    res.send(
      dbRes
      // openDataApi,
    );
  } catch (error) {
    console.log("GET Minneapolis Open Api/db error is", error);
  }
});

router.get("/hazard_genre",  async(req, res) => {
  try {
    const query = ` SELECT * FROM "hazard_genre"`

    const dbData = await pool.query(query)

    res.send(dbData.rows)
    
  } catch (error) {
    console.log("get hazard error is", error.data)
    
  }

})


/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
