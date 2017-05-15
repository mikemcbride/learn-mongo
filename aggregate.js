const mongo = require('mongodb').MongoClient
const size = process.argv[2]

const url = 'mongodb://localhost:27017/learnyoumongo'

mongo.connect(url, (err, db) => {
  if (err) throw err
  const prices = db.collection('prices')
  prices.aggregate([
    {
      $match: { size }
    },
    {
      $group: {
        _id: 'average',
        average: {
          $avg: '$price'
        }
      }
    }
  ]).toArray((err, results) => {
    if (err) throw err
    if (results.length === 0) {
      throw new Error('No results found')
    }
    
    console.log(results[0].average.toFixed(2))
    db.close()
  })
})