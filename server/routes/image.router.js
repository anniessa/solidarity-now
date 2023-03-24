const express = require('express');
const pool = require('../modules/pool');
const aws = require('aws-sdk');
const { s3Upload } = require('../s3Service');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

require('dotenv').config();

const secretAccessKey = process.env.AWS_ACCESS_SECRET
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const region = process.env.AWS_REGION
const bucket = process.env.AWS_BUCKET

const s3 = new aws.S3({
    region,
    secretAccessKey,
    accessKeyId
});

/** ---------- Multer | S3 ---------- **/
const multer = require('multer');
require('dotenv').config();
const storage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'image') {
        cb(null, true)
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
    }
}

const upload = multer({ storage, fileFilter });



// get photo by user id
router.get('/:id', async (req, res) => {
    const userId = req.params.userId;
    const sqlValue = [userId]
    const sqlText = `
    SELECT "picture" from "user" 
    WHERE "id" = $1;`;
    pool.query(sqlText, sqlValue)
    .then((result ) => {
        res.send(result.rows)
    })
    .catch(err => {
        console.log('error getting photos from user', err)
    })
})

//initial post 
router.put('/files', rejectUnauthenticated, upload.single('file'), async (req, res) => {
    console.log('req.file', req.file)
    console.log(req.body.Location);
    try {
        const results = await s3Upload(req.file);
        console.log('AWS S3 upload success');
        const sqlText = `UPDATE "user" 
        SET "picture" = $1 
        WHERE id = $2`
        pool.query(sqlText, [results.Location, req.user.id]) 
    } catch (err) {
        res.sendStatus(500);
        console.log('AWS S3 upload fail', err);
    }
});


module.exports = router;