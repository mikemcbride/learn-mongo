const mongo = require('mongodb').MongoClient
const age = parseInt(process.argv[2], 10)

const url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, (err, db) => {
  if (err) throw err
  
  const parrots = db.collection('parrots')
  
  parrots.find({
    age: {
      $gt: age
    }
  }).toArray((err, docs) => {
    if (err) throw err
    console.log(docs)
    db.close()
  })
})
