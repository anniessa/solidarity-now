const express = require('express');


const aws = require('aws-sdk');

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
const { s3Upload } = require('../s3Service');


//downloads a file from s3
router.get('/', async (req, res) => {
    const url = await generateUploadURL();
    res.send({ url })
})

//initial post to s3
router.post('/files', rejectUnauthenticated, upload.single('file'), async (req, res) => {
    try {
        const results = await s3Upload(req.files);
        console.log('AWS S3 upload success');
        res.send(results.Location)
    } catch (err) {
        res.sendStatus(500);
        console.log('AWS S3 upload fail', err);
    }
});

//post to database
// router.post('/', rejecetUnauthenticated,(req, res) => {
//     const
// })

module.exports = router;