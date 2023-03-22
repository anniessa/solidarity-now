const express = require('express');
const multer = require('multer');

const aws = require('aws-sdk');
const fs = require('fs');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// require('dotenv').config();

// const secretAccessKey = process.env.AWS_ACCESS_SECRET
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const region = process.env.AWS_REGION
// const bucket =  process.env.AWS_BUCKET

// s3 = new aws.S3({
//     region,
//     secretAccessKey,
//     accessKeyId
// });

// // uploads a file to s3
// const uploadS3 = (file) => {
//     const fileStream = fs.createReadStream(file.path)

//     const uploadParams = {
//         bucket: bucket,
//         body: fileStream,
//         key: file.filename
//     }

//     return s3.upload(uploadParams).promise();
// }

// exports.uploadFile = uploadFile;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../public/images/')
    },
    filename:  (req, file, cb)  => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({storage: storage});


//downloads a file from s3
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})


router.post('/', rejectUnauthenticated, upload.single('image'), (req, res)  => {
    let file = req.file;
    let sqlText = `INSERT INTO "user" ("picture")
    VALUES($1);`
    // console.log(file);
    pool.query(sqlText, [`images/${file.filename}`])
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
});

module.exports = router;