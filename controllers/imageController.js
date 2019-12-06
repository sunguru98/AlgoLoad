const upload = require('../utils/multerUtils')
const uploadToS3 = require('../utils/awsS3')
const generateText = require('../utils/imageToText')
const addObjectToAlgoliaIndex = require('../utils/addObjectToAlgoIndex')

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

        const user = req.user
        const files = req.files

        const totalRes = [
          ...(await uploadToS3(files, req.user)),
          ...(await generateText(files))
        ]
        const newImages = totalRes.slice(0, files.length)
        const newTexts = totalRes.slice(files.length)

        const results = newImages
          .map((image, index) => ({
            ...image,
            textContent: newTexts[index]
          }))
          .filter(({ location, key, textContent }) => {
            const data = user.datas.find(
              d =>
                (d.location === location || d.key === key) &&
                d.textContent === textContent
            )
            return !data ? true : false
          })

        user.datas = [...user.datas, ...results]
        const { publicSearchKey } = await addObjectToAlgoliaIndex(
          user._id,
          newImages.map(image => image.location),
          newTexts.map(newText => newText)
        )
        user.publicSearchKey = publicSearchKey
        await user.save()
        res
          .status(201)
          .send({
            statusCode: 201,
            datas: user.datas,
            publicKey: publicSearchKey
          })
      })
    } catch (err) {
      return res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}
