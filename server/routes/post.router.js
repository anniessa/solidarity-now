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
  SELECT "posts".id, "posts".post_type, "posts".content, "posts".additional_resource, JSON_AGG("tags") AS "tags" FROM "tags"
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

// returning a specific post for each user by id
router.get('/:id', (req, res) => {
  const sqlText =
    `
    SELECT "posts".id, "posts".post_type, "posts".content, "posts".additional_resource, JSON_AGG("tags") AS "tags" FROM "tags"
    RIGHT JOIN "tags_posts" ON "tags".id = "tags_posts".tags_id
    RIGHT JOIN "posts" ON "posts".id = "tags_posts".posts_id
    WHERE user_id = $1
    GROUP BY "posts".id, "posts".post_type,  "posts".content, "posts".additional_resource;  
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
  let tags = req.body.tags
  try {
    const insertPostQuery = `
    INSERT INTO "posts" ("post_type", "content", "additional_resource", "user_id")
    VALUES ($1, $2, $3, $4)
    RETURNING "id";`
     //RETURNING 'id' will give us back the id of the created post
    result = await pool.query(insertPostQuery, [req.body.post_type, req.body.content, req.body.additional_resource, req.user.id])
    createdPostId = result.rows[0].id

    // mapping over the tag_ids array to do the query for EACH individual tag
    const postTags = tags.map(tag => {
    const insertPostTagQuery = `
    INSERT INTO "tags_posts" ("posts_id", "tags_id")
    VALUES ($1, $2);
    `
    pool.query(insertPostTagQuery, [createdPostId, tag.id])
    })
    // returning an empty object, until the map is completed and once its completed, it sends status
    Promise.all(postTags)
    res.sendStatus(200);
  } catch (err) {
    console.log(`Error posting post with tag`, err)
    res.sendStatus(500);  
  }
    });

// Edit request by id -- update a post if authorized logged in user edits
router.put('/:id', rejectUnauthenticated, async (req, res) => {
  console.log('req.body.tags', req.body.tags);
  console.log("req.params.id", req.params.id)
  let tags = req.body.tags

  try {
  const sqlText = `
  UPDATE posts
  SET "post_type" = $3, "content" = $4, "additional_resource" = $5
  WHERE id = $1 and user_id = $2;
  `
  result = await pool.query(sqlText, [
    req.params.id,
    req.user.id,
    req.body.post_type,
    req.body.content,
    req.body.additional_resource
  ])

  // DELETE all tag-post relations for this post (we're going to rewrite new tags below)
  const secondSqlText = 
  `DELETE FROM "tags_posts" 
  WHERE posts_id= $1;`
  result = await pool.query(secondSqlText, [req.params.id] )
  // INSERT new tags
    const updatedTags = tags.map(async tag => {
    const insertPostTagQuery = `
    INSERT INTO "tags_posts" ("posts_id", "tags_id")
    VALUES ($1, $2);
    `
    await pool.query(insertPostTagQuery, [req.params.id, tag.id])
    })
    // returning an empty object, until the map is completed and once its completed, it sends status
   await Promise.all(updatedTags)
    res.sendStatus(200)
  } catch (error) {
    console.log('server-side error for put', error)
    res.sendStatus(500)
  }

  router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id)
    const sqlText= `
    DELETE FROM "posts" WHERE id = $1 and "user_id" = $2;
    `;
    pool.query(sqlText, [req.params.id, req.user.id])
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(`Error deleting post`, error);
      res.sendStatus(500);
    });
  });

});

module.exports = router;
