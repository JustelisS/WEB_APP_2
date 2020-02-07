const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get courses
router.get('/', async (req, res) => {
  const courses = await loadCollection();
  res.send(await courses.find({}).toArray());
});

//Gets all courses that were made by a selected author (:author)
router.get('/:author', async (req, res) => {
  const courses = await loadCollection();
  res.send(await courses.find({ author: req.params.author }).toArray());
});

//Deletes a course by it's id (:id)
router.delete('/:id', async (req, res) => {
  const courses = await loadCollection();
  res.status(200).send(await courses.deleteOne({_id: new mongodb.ObjectID(req.params.id)}));
});

//Adds a rating to specified course, if a user is leaving a rating for the first time
//the list of rated users will be appended. If a user had rated before, the rating will be
//updated
router.put('/:id-:email-:rating', async (req, res) => {
  const courses = await loadCollection();
  await courses.findOneAndUpdate(
    { _id: new mongodb.ObjectID(req.params.id), "rated.email": req.params.email },
    { $set: { "rated.$.rating": parseInt(req.params.rating) }},
    function(err, found) {
      if(err) {
        res.status(500).send(err);
      }
      if(found.value === null) {
        courses.findOneAndUpdate(
          { _id: new mongodb.ObjectID(req.params.id) },
          { $push: { rated: { email: req.params.email, rating: parseInt(req.params.rating) }}},
          function(err) {
            if(err) {
              res.status(500).send(err);
            }
            res.status(201).send();
          }
        );
      }
      res.status(201).send();
    }
  );
});

//Add course
router.post('/addcourse', async (req, res) => {
  const courses = await loadCollection();
  await courses.insertOne({
    topic: req.body.topic,
    price: req.body.price,
    county: req.body.county,
    postcode: req.body.postcode,
    day: req.body.day,
    time: req.body.time,
    length: req.body.length,
    description: req.body.description,
    author: req.body.author,
    average: 0,
    rated: []
  }, function(err) {
    if(err) {
      res.status(500).send();
    }
  });
  res.status(201).send();
})

//On call connection with the database is established
async function loadCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017', { useNewUrlParser: true });

  return client.db('afterSchool').collection('courses');
}

module.exports = router;
