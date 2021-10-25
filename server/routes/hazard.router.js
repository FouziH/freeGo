const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.post('/', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const image = req.body.image;
  const userId = req.user.id;
  const approved = true;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  console.log('user id is ', userId);
  

  const queryText = `
    INSERT INTO "hazard" 
        (name, description, street, city, state, zip, image, user_id, approved, latitude, longitude)
    VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `;
  pool
    .query(queryText, [name, description, street, city, state, zip, image, userId, approved, latitude, longitude])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Post hazard failed: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
