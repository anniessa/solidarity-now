const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route 
    const sqlText = `
    SELECT "tags_posts".tags_id, "tags_posts".posts_id FROM "tags_posts"
    ORDER BY "tags_posts".posts_id;
  `
    pool.query(sqlText)
        .then(result => {
            console.log('tagsPosts result.rows', result.rows)
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Error getting all the tags`, error)
            res.sendStatus(500);
        })
});

module.exports = router;