const { connect } = require('mongoose')

connect(
  process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err))
