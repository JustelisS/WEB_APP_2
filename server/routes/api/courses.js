const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/p', (req, res) => {
  res.send('Hello World')
});

//Get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//get mycourses
router.get('/:author', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({ author: req.params.author }).toArray());
});

//delete course
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  res.status(200).send(await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)}));
  //res.status(200).send();
})

//Add posts
router.post('/addcourse', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    topic: req.body.topic,
    price: req.body.price,
    county: req.body.county,
    postcode: req.body.postcode,
    day: req.body.day,
    time: req.body.time,
    length: req.body.length,
    description: req.body.description,
    author: req.body.author
  }, function(err) {
    if(err) {
      res.status(400).send();
    }
  });
  res.status(201).send();
})

//Delete post
/*router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
})*/

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017', { useNewUrlParser: true });

  return client.db('afterSchool').collection('courses');
}

module.exports = router;
