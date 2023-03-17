const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText =  `
  SELECT "posts".post_type, "posts".content, "posts".additional_resource, ARRAY_AGG("tags".tag_name) AS "tags_column" FROM "tags"
  RIGHT JOIN "tags_posts" ON "tags".id = "tags_posts".tags_id
  RIGHT JOIN "posts" ON "posts".id = "tags_posts".posts_id
  GROUP BY "posts".id;
`
  pool.query(sqlText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log(`Error getting all the posts`, error)
      res.sendStatus(500);
    })
});

// returning a specific item by id
router.get('/:id', (req, res) => {
  const sqlText =
    `
    SELECT "posts".post_type, "posts".content, "posts".additional_resource, ARRAY_AGG("tags".tag_name) AS "tags_column" FROM "tags"
    RIGHT JOIN "tags_posts" ON "tags".id = "tags_posts".tags_id
    RIGHT JOIN "posts" ON "posts".id = "tags_posts".posts_id
    WHERE user_id = $1
    GROUP BY "posts".post_type,  "posts".content, "posts".additional_resource;  
 `
//  console.log(req.user.id)
//  console.log('hello world')
  pool.query(sqlText, [req.user.id])
    .then(result => {
      // console.log(result.rows)
      res.send(result.rows);
    })
    .catch(err => {
      console.log(`Error getting post by ID`, err)
      res.sendStatus(500)
    })
})


router.post('/', rejectUnauthenticated, async (req, res) => {
  // POST route code here
  console.log(req.user)
  // console.log('req.body:', req.body)
  let tag_ids = req.body.tag_ids

  try {
    const insertPostQuery = `
    INSERT INTO "posts" ("post_type", "content", "additional_resource", "user_id")
    VALUES ($1, $2, $3, $4)
    RETURNING "id";`
     //RETURNING 'id' will give us back the id of the created post
    result = await pool.query(insertPostQuery, [req.body.post_type, req.body.content, req.body.additional_resource, req.body.user_id])
    createdPostId = result.rows[0].id

    // mapping over the tag_ids array to do the query for EACH individual tag
    const postTags = tag_ids.map(tagId => {
    const insertPostTagQuery = `
    INSERT INTO "tags_posts" ("posts_id", "tags_id")
    VALUES ($1, $2);
    `
    pool.query(insertPostTagQuery, [createdPostId, tagId])
    })
    // returning an empty object, until the map is completed and once its completed, it sends status
    Promise.all(postTags)
    res.sendStatus(200);
  } catch (err) {
    console.log(`Error posting post with tag`, err)
    res.sendStatus(500);  
  }
    });

module.exports = router;
