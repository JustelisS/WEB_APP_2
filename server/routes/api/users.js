const express = require('express');
const mongodb = require('mongodb');

const router2 = express.Router();


router2.get('/logout', (req, res) => {
  req.session.destroy();
  return res.status(200).send();
});


//Get users
router2.get('/', async (req, res) => {
  const users = await loadCollection();
  res.send(await users.find({}).toArray());
});

//does email exist
router2.get('/:email', async (req, res) => {
  const users = await loadCollection();
  users.findOne({ email: req.params.email }, function(err, user) {
    if(err) {
      return res.status(500).send();
    }
    if(!user) {
      return res.status(404).send(false);
    }
    return res.status(200).send(true);
  })
});

router2.post('/checklogin', (req, res) => {
  if(!req.session.user) {
    console.log(req.session.user);
    return res.status(404).send();
  }
  return res.status(200).send(req.session.user.email);
})
//llohn
router2.post('/login', async (req, res) => {
  const users = await loadCollection();
  users.findOne({ email: req.body.email, password: req.body.password}, function(err, user) {
    if(err) {
      return res.status(500).send("Error getting details");
    }
    if(!user) {
      return res.status(404).send("User not found");
    }
    req.session.user = user;
    console.log(req.session.user);
    return res.status(200).send({ email: req.session.user.email,
                                  usertype: req.session.user.usertype });

  })
});


//Add users
router2.post('/newUser', async (req, res) => {
  const users = await loadCollection();
  await users.insertOne({
    usertype: req.body.usertype,
    email: req.body.email,
    password: req.body.password
  }, function(err) {
    if(err) {
      return res.status(500).send();
    }
  });
   return res.status(201).send();
});


async function loadCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb://localhost:27017', { useNewUrlParser: true });

  return client.db('afterSchool').collection('users');
}

module.exports = router2;
