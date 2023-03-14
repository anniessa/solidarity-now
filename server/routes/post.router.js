const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `SELECT * from "posts"`
  pool.query(sqlText)
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log(`Error getting all the posts`, error)
    res.sendStatus(500);
  })
});

// getting all the tags for each post - used string_agg to combine all the tags
router.get('/:id', (req, res) => {
 const sqlText = 
 `
 SELECT "posts".post_type, "posts".content, "posts".additional_resource, string_agg("tags".tag_name, ', ') AS "tags_column" FROM "tags"
 JOIN "tags_posts" ON "tags".id = "tags_posts".tags_id
 JOIN "posts" ON "posts".id = "tags_posts".posts_id
 WHERE "posts".id = 8
 GROUP BY "posts".post_type, "posts".content, "posts".additional_resource; 
 `
 pool.query(sqlText, [req.params.id])
 .then(result => {
  res.send(result.rows);
 })
 .catch(err => {
  console.log(`Error getting post by ID`, err)
  res.sendStatus(500)
 })
})


router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log(req.user)

  //RETURNING 'id' will give us back the id of the created post
  const insertPostQuery = `
  INSERT INTO "posts" ("post_type", "content", "additional_resource", "user_id")
  VALUES ($1, $2, $3, $4)
  RETURNING "id";`

  //first query makes the post
  pool.query(insertPostQuery, [req.body.post_type, req.body.content, req.body.additional_resource, req.body.user_id])
  .then(result => {
    console.log('New post id:', result.rows[0].id) //here is the ID

    let createdPostId = result.rows[0].id
    //this constant makes the tag reference
    const insertPostTagQuery = `
    INSERT INTO "tags_posts" ("posts_id", "tags_id")
    VALUES ($1, $2);
    `
    //this query adds the tag to the post
    pool.query(insertPostTagQuery, [createdPostId, req.body.tags_id])
    .then(result => {
        //now that both are done, send back success
        console.log(req.body.tags_id)
        res.sendStatus(201);
      })
      .catch(err => {
        console.log(`Error posting post with tag`, err)
        res.sendStatus(500);
      })
  });
});

module.exports = router;
