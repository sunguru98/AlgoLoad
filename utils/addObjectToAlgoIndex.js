const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SECRET_KEY
)

const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)
index.setSettings({
  searchableAttributes: ['textContent'],
  attributesForFaceting: ['filterOnly(viewableBy)']
})

const addObject = (userId, images, texts) =>
  new Promise((resolve, reject) => {
    try {
      const publicSearchKey = client.generateSecuredApiKey(
        process.env.ALGOLIA_SEARCH_KEY,
        {
          filters: `viewableBy:${userId}`
        }
      )
      const objects = images.map((image, index) => ({
        viewableBy: userId,
        image,
        textContent: texts[index]
      }))
      index
        .addObjects(objects)
        .then(response => resolve({ response, publicSearchKey }))
    } catch (err) {
      reject(err)
    }
  })

module.exports = addObject
