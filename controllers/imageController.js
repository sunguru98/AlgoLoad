const User = require('../models/User')
const upload = require('../utils/multerUtils')
const uploadToS3 = require('../utils/awsS3')
const generateText = require('../utils/imageToText')

module.exports = {
  async uploadImage(req, res) {
    try {
      upload(req, res, async err => {
        if (err)
          return res.status(400).send({
            statusCode: 400,
            message:
              err.message === 'Unexpected field'
                ? 'Image Limit is 3 to avoid longer waiting times'
                : err.message
          })
        const files = req.files
        const images = await uploadToS3(files)
        const texts = await generateText(files)
        console.log(texts)
        const results = images.map((image, index) => ({
          ...image,
          textContent: texts[index]
        }))

        req.user.datas = [...req.user.datas, ...results]
        await req.user.save()
        res.send({ statusCode: 201, results })
      })
    } catch (err) {
      return res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}
