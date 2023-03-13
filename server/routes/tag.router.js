const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM "tags" ORDER BY "tag_name" ASC`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.error(`Error on query ${error}`)
    res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log(req.user)

  const sqlText = `INSERT INTO "tags" ("tag_name")
  VALUES ($1);`;

  const sqlParams = [req.body.name]
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
