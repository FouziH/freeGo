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
          ) * 3961 <= 5
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
    let userLng = "%";
    let startDate = '2010-01-01';
    let endDate = '2090-01-01';
    let description = "%";

    if(JSON.parse(req.query.filterParams).date) {
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
     userLng = JSON.parse(req.query.filterParams).userLatLng.longitude;
    }

    if ( JSON.parse(req.query.filterParams).latitude) {
      userLat = JSON.parse(req.query.filterParams).latitude;
    }

    if ( JSON.parse(req.query.filterParams).longitude) {
     userLng = JSON.parse(req.query.filterParams).longitude;
    }

    const dbData = await pool.query(query, [
      userLat,
      userLng,
      threat_level,
      genreTitle,
      description,
      startDate,
      endDate,
    ]);
    
    //Making axios get request to open Minneapolis Api
    const openApiData = await axios.get(
      // "https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2021/FeatureServer/0/query?where=1%3D1&outFields=publicaddress,reportedDate,beginDate,offense,description,UCRCode,centergbsid,centerLong,centerLat,centerX,centerY,neighborhood,lastchanged,LastUpdateDateETL&resultRecordCount=50&outSR=4326&f=json"
      `https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2021/FeatureServer/0/query?where=1%3D1&outFields=publicaddress,reportedDate,beginDate,offense,description,UCRCode,centergbsid,centerLong,centerLat,centerX,centerY,neighborhood,lastchanged,LastUpdateDateETL&geometry=` + getBoundingBox([userLat, userLng], 5) + `&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json&resultRecordCount=50`
    );

    const data = dbData.rows;
    const openDataApi = openApiData.data.features;
    let ODAPIDMODIFIED = [];

    openDataApi.map((item) => {
      if(containsAny(item.attributes.description, ["RAPE", "MURDER"])) {
      } else {
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
          is_minn: true,
        });
      }
    });

    function containsAny(str, substrings) {
        for (var i = 0; i != substrings.length; i++) {
          var substring = substrings[i];
          if (str.indexOf(substring) != - 1) {
            return substring;
          }
        }
        return null; 
    }


    let dbRes = [...data, ...ODAPIDMODIFIED];
    // let dbRes = [...data];

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



/**
 * Get Bounding Box
 * Returns a 4 point latitude and longitude envelope that is 5 miles
 * distance = km
 * centerPoint array of lat lng [lat, lng]
 */
getBoundingBox = function (centerPoint, distance) {
  var MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, R, radDist, degLat, degLon, radLat, radLon, minLat, maxLat, minLon, maxLon, deltaLon;
  if (distance < 0) {
    return 'Illegal arguments';
  }
  // helper functions (degrees<–>radians)
  Number.prototype.degToRad = function () {
    return this * (Math.PI / 180);
  };
  Number.prototype.radToDeg = function () {
    return (180 * this) / Math.PI;
  };
  // coordinate limits
  MIN_LAT = (-90).degToRad();
  MAX_LAT = (90).degToRad();
  MIN_LON = (-180).degToRad();
  MAX_LON = (180).degToRad();
  // Earth's radius (km)
  R = 6378.1;
  // angular distance in radians on a great circle
  radDist = distance / R;
  // center point coordinates (deg)
  degLat = centerPoint[0];
  degLon = centerPoint[1];
  // center point coordinates (rad)
  radLat = degLat.degToRad();
  radLon = degLon.degToRad();
  // minimum and maximum latitudes for given distance
  minLat = radLat - radDist;
  maxLat = radLat + radDist;
  // minimum and maximum longitudes for given distance
  minLon = void 0;
  maxLon = void 0;
  // define deltaLon to help determine min and max longitudes
  deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
  if (minLat > MIN_LAT && maxLat < MAX_LAT) {
    minLon = radLon - deltaLon;
    maxLon = radLon + deltaLon;
    if (minLon < MIN_LON) {
      minLon = minLon + 2 * Math.PI;
    }
    if (maxLon > MAX_LON) {
      maxLon = maxLon - 2 * Math.PI;
    }
  }
  // a pole is within the given distance
  else {
    minLat = Math.max(minLat, MIN_LAT);
    maxLat = Math.min(maxLat, MAX_LAT);
    minLon = MIN_LON;
    maxLon = MAX_LON;
  }
  return [
    minLon.radToDeg(),
    minLat.radToDeg(),
    maxLon.radToDeg(),
    maxLat.radToDeg()
  ];
};

module.exports = router;


// https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2021/FeatureServer/0/query?where= (reportedDate %3D '1626566400000' OR reportedDate %3D '1626566400001') &outFields=*&outSR=4326&f=json
// https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2021/FeatureServer/0/query?where=reportedDate ='1626566400000' OR reportedDate = '1626566400001')&outFields=*&outSR=4326&f=json

// consolelog(getBoundingBox(centerPoint[44.977753, -93.265015], 8));



// https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2021/FeatureServer/0/query?where=1%3D1&outFields=*&geometry=  -93.36660894925227 ,   44.90588736037304 ,   -93.16342105074776 ,   45.04961863962696&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json



// https://services.arcgis.com/afSMGVsC7QlRK1kZ/arcgis/rest/services/Police_Incidents_2021/FeatureServer/0/query?where=1%3D1&outFields=&geometry=  -93.36660894925227 ,   44.90588736037304 ,   -93.16342105074776 ,   45.04961863962696&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json