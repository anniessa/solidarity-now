const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `SELECT * from "posts" `
});


router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log(req.user)

  const sqlText = `INSERT INTO "posts" ("post_type", "content", "additional_resource", "user_id")
  VALUES ($1, $2, $3, $4);`;

  const sqlParams = [
    req.body.post_type,
    req.body.content,
    req.body.additional_resource,
    req.body.user_id
  ]
  pool.query(sqlText, sqlParams)
  .then(dbRes => {
    res.sendStatus(200)
  })
  .catch(error => {
    console.log('error in posting request/offer form', error)
    res.sendStatus(500)
  })

});

module.exports = router;
