const mongo = require('mongodb').MongoClient
const dbName = process.argv[2]
const collName = process.argv[3]
const id = process.argv[4]

const url = `mongodb://localhost:27017/${dbName}`

mongo.connect(url, (err, db) => {
  if (err) throw err
  
  const collection = db.collection(collName)
  collection.remove({
    _id: id
  }, (err, data) => {
    if (err) throw err
    db.close()
  })
})