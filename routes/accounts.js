module.exports = {
  getAccounts(req, res) {
    req.collection.find({}).toArray(function(err, docs) {
      if (err) return console.error(err)
      res.send(docs)
    })
  },

  getAccountById(req, res, next) {
    req.collection
      .findOne({id: Number(req.params.id)}, {_id: false})
      .then(function(result) {
        res.send(result)
      })
  },
  // curl -i -X POST -H "Content-Type:application/json" -d "{\"balance\":150, \"id\": 1}"  localhost:3000/accounts
  createAccount(req, res, next) {
    req.collection
      .insertOne(req.body)
      .then(function(result) {
        // send a response to the client
        res.status(201).send(result)
      })
      .catch(function(error) {
        // Call the error middelware handler
        next('Internal server error')
      })
  },

  updateAccount(req, res) {
    res.send('working')
  },

  deleteAccount(req, res) {
    res.send('working')
  }
}
