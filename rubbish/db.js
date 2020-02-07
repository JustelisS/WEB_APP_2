const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "afterSchool";
const url = 'mongodb://localhost:27017';
const mongoOptions = {useNewUrlParser : true,
                      useUnifiedTopology : true};

const state = {
  db : null
};

const connect = (cb) => {
  if(state.db) {
    cb();
  } else {
    MongoClient.connect(url, mongoOptions, (err, client) => {
      if(err) {
        cb(err);
      } else {
        state.db = client.db(dbname);
        cb();
      }
    });
  }
}

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
}

const getDB = () => {
  return state.db;
}

module.exports = {getDB, connect, getPrimaryKey};

app.put('/collections/:collectionName/update/:id-:user-:score', (req, res) => {
    req.collection.findOneAndUpdate({
        _id: mongoDB.ObjectID(req.params.id),
        "rating.user": (req.params.user)
    }, {$set: {"rating.$.score": (req.params.score)}})
        .then(results => {
            if (results.value === null) {
                req.collection.findOneAndUpdate({
                        _id: mongoDB.ObjectID(req.params.id),
                    },
                    {$push: {rating: {user: (req.params.user), score: (req.params.score)}}}
                )
                    .then(value => res.send(value))
            } else {
                res.send(results)
            }
        })
        .catch(err => res.send(err));
});
