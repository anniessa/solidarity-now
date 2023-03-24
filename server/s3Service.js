const { S3 } = require("aws-sdk");
const uuid = require('uuid').v4

exports.s3Upload = async (files) => {
    const s3 = new S3()

    const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `uploads/${uuid()}-${files.originalname}`,
            Body: files.buffer
    }

    return await s3.upload(params).promise();
}
