const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM "tags"`;
  pool.query(sqlText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.error(`Error on query ${error}`)
    res.sendStatus(500);
  })
});



module.exports = router;
