const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SECRET_KEY
)

const addObject = (userId, image, textContent) =>
  new Promise((resolve, reject) => {
    const object = {
      objectID: userId,
      image,
      textContent
    }
    const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)
    index
      .getObject(userId)
      .then(() => {
        index
          .saveObject(object)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
      .catch(err => {
        index
          .addObject(object)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
  })

module.exports = addObject
