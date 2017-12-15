const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const mongoDriver = require('mongodb').MongoClient

const routes = require('./routes')
const app = express()

const DB_URL = 'mongodb://localhost:27017'
const DATABASE = 'accounts-db'
const PORT = process.argv[2] || 3000

app.use(logger('dev'))
app.use(bodyParser.json())

mongoDriver.connect(DB_URL, function(err, client) {
  if (err) return console.error(err)

  let db = client.db(DATABASE)
  let collection = db.collection('accounts')

  app.use(function(req, res, next) {
    req.collection = collection
    next()
  })

  app.get('/accounts', routes.accounts.getAccounts)
  app.get('/accounts/:id', routes.accounts.getAccountById)

  app.post('/accounts', routes.accounts.createAccount)

  app.put('/accounts/:id', routes.accounts.updateAccount)

  app.delete('/accounts/:id', routes.accounts.deleteAccount)

})

// app.get('/posts', routes.posts.getPosts)
// app.post('/posts', routes.posts.addPost)
// app.put('/posts/:id', routes.posts.updatePost)
// app.delete('/posts/:id', routes.posts.removePost)

// dev mode error handler
app.use(errorHandler())

app.listen(PORT, () => {
  console.log('server is up and running at port ', PORT)
})
