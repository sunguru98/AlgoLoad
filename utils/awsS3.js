const { S3 } = require('aws-sdk')
const User = require('../models/User')

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

s3.createBucket(
  {
    Bucket: process.env.AWS_BUCKET_NAME,
    CreateBucketConfiguration: {
      LocationConstraint: 'us-east-2'
    }
  },
  (err, data) => {
    if (err) return
    else console.log('Bucket Created Successfully', data.Location)
  }
)

const createUploadParams = file => ({
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: file.originalname,
  ACL: 'public-read',
  Body: file.buffer
})

const uploadImages = async (files, user) => {
  try {
    const datas = await Promise.all(
      files.map(file => {
        const d = user.datas.find(
          data =>
            data.location === `${process.env.AWS_IMAGE_URL}${file.originalname}`
        )
        if (d) return Promise.resolve({ Location: d.location, Key: d.key })
        const params = createUploadParams(file)
        return s3.upload(params).promise()
      })
    )
    return datas.map(s => ({
      location: s.Location,
      key: s.Key
    }))
  } catch (err) {
    throw err
  }
}

module.exports = uploadImages
