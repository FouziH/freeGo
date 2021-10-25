const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/edit/:id", rejectUnauthenticated, (req, res) => {
  console.log('user hazard was hit!');
  const id = req.params.id;
  const userId = req.user.id;
  let query;

  if (req.user.role === 1) {
    query = `SELECT * FROM "hazard" WHERE id = $1`;
    pool
    .query(query, [id])
    .then((result) => {
      console.log("hazard by id is ", result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log("Get hazard by id for admin failed", err);
      res.sendStatus(500);
    });
  }
  else {
    query = `SELECT * FROM "hazard" WHERE id = $1 AND user_id = $2`;
    pool
      .query(query, [id, userId])
      .then((result) => {
        console.log("hazard by id is ", result.rows[0]);
  
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.log("Get hazard by id failed", err);
        res.sendStatus(500);
      });
  }
});

router.get("/flagged", rejectUnauthenticated, (req, res) => {
  console.log('flagged was hit!');
  
    if (req.user.role !== 1) {
      res.sendStatus(401)
      return;
    }

    const query = `
    SELECT 
      f.id as id, f.who_flagged, f.is_accurate, f.description as flag_description, h.id as hazard_id,
      h.user_id as user_created_by, h.genre_id, h.approved, h.city, h.state, h.street, h.zip, h.threat_level, h.name, h.image, h.created_date
    FROM "flagged_hazard" as f
    JOIN "hazard" as h
    ON f.hazard_id = h.id;
        `;
    pool
    .query(query)
    .then((result) => {
      console.log("flagged hazards are ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get flagged hazard for admin failed", err);
      res.sendStatus(500);
    });
});

router.get("/user/:id", rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;

  if (req.user.role === 1) {
    let query = `SELECT * FROM "hazard";`;
    pool.query(query)
    .then((result) => {
      console.log("user hazard is ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get User Hazard failed", err);
      res.sendStatus(500);
    });
  }
  else {
    let query = `SELECT * FROM "hazard" WHERE user_id = $1`;
    console.log('this is an user');
    pool.query(query, [userId])
    .then((result) => {
      console.log("user hazard is ", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get User Hazard failed", err);
      res.sendStatus(500);
    });
  }
    
});

router.post("/", rejectUnauthenticated, (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const image = req.body.image;
  const userId = req.user.id;
  const approved = false;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const genreId = req.body.genre_id;
  const threatLevel = req.body.threat_level;

  // console.log("user id is ", userId);

  const queryText = `
    INSERT INTO "hazard" 
        (name, description, street, city, state, zip, image, user_id, approved, latitude, longitude, genre_id, threat_level)
    VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
    `;
  pool
    .query(queryText, [
      name,
      description,
      street,
      city,
      state,
      zip,
      image,
      userId,
      approved,
      latitude,
      longitude,
      genreId,
      threatLevel,
    ])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Post hazard failed: ", err);
      res.sendStatus(500);
    });
});

router.post("/flagged", rejectUnauthenticated, (req, res) => {
  let userId = req.user.id
  let hazardId = req.body.hazardId;
  let description = req.body.description
  let isAccurate = false;

  const queryText = `
    INSERT INTO "flagged_hazard" 
        (who_flagged, hazard_id, description, is_accurate)
    VALUES 
        ($1, $2, $3, $4);
    `;
  pool
    .query(queryText, [userId, hazardId, description, isAccurate])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Post flagged hazard failed: ", err);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const image = req.body.image;
  const userId = req.user.id;
  const approved = req.body.approved;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const genreId = req.body.genre_id;
  const threatLevel = req.body.threat_level;

  console.log("req body is ", req.body);
  let query;

  if (req.user.role === 1) {
  query = `
  UPDATE "hazard"
  SET 
    name = $1, 
    description = $2, 
    street = $3, 
    city = $4, 
    state = $5, 
    zip = $6, 
    image = $7, 
    approved = $8, 
    latitude = $9, 
    longitude = $10,
    genre_id = $11,
    threat_level = $12
  WHERE id = $13;
  `;

  pool
    .query(query, [
      name,
      description,
      street,
      city,
      state,
      zip,
      image,
      approved,
      latitude,
      longitude,
      genreId,
      threatLevel,
      id
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("hazard PUT by id  for admin failed", err);
      res.sendStatus(500);
    });
  }
  else {
  query = `
  UPDATE "hazard"
  SET 
    name = $1, 
    description = $2, 
    street = $3, 
    city = $4, 
    state = $5, 
    zip = $6, 
    image = $7, 
    approved = $8, 
    latitude = $9, 
    longitude = $10,
    genre_id = $11,
    threat_level = $12
  WHERE id = $13 AND user_id = $14;
  `;
  pool
    .query(query, [
      name,
      description,
      street,
      city,
      state,
      zip,
      image,
      approved,
      latitude,
      longitude,
      genreId,
      threatLevel,
      id,
      userId
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("hazard PUT by id failed", err);
      res.sendStatus(500);
    });
  }
});

router.delete("/flagged/:id", rejectUnauthenticated, (req, res) => {
  let id = req.params.id;
  if (req.user.role !== 1) {
    res.sendStatus(401);
    return;
  }
    const query = `DELETE FROM "flagged_hazard" WHERE id = $1;`;
    pool.query(query, [id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log("flagged hazard DELETE failed", err);
        res.sendStatus(500);
      });
});

router.get("/details/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const params = [req.params.id];
    console.log("get card by the id is", params);
    const query = `SELECT h.id, h.approved,h.name, h.city, h.state, h.street, h.zip, h.threat_level, h.latitude, h.longitude, h.image, genre.title, genre.id as genre_id, genre.description FROM "hazard" as h
LEFT JOIN "hazard_genre" as genre ON genre.id = h.genre_id
 WHERE h.id = $1`;

    const dbData = await pool.query(query, params);

    res.send(dbData.rows);
  } catch (error) {
    console.log("GET details id error is", error)
  }
});


module.exports = router;
