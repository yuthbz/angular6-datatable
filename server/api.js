const express = require('express');
const router = express.Router();

const User = require('./models/users');

//get users from db
router.get('/users', (req, res) => {

  User.find(function (err, users) {
    if (err) return console.error(err);

    res.json({
      result: 'ok',
      message: users
    });

  });

});

//get users with id from db
router.get('/users/:id', (req, res) => {

  User.findById(req.params.id, (err, users) => {
    if (err) return console.error(err);

    res.json({
      result: 'ok',
      message: users
    });

  });

});

//add a new users to the db
router.post('/users', (req, res) => {

  const data = req.body;

  const newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    address: {
      street: data.address.street,
      city: data.address.city,
      province: data.address.province,
      postcode: data.address.postcode,
      country: data.address.country
    }
  });

  newUser.save(function (err, result) {
    if (err) console.log('Error on save!')

    res.json({
      result: 'ok',
      message: 'Inserted.'
    });

  });

});

//updata a user in the db
router.put('/users', (req, res) => {

  const data = req.body;
  User.findById(data._id, (err, user) => {
    if (err) return console.error(err);

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.password = data.password;

    user.save(function (err) {
      if (err) console.log('Error on update!')

      res.json({
        result: 'ok',
        message: 'Updated.'
      });

    });

  });

});

//delete user from the db
router.delete('/users/:id', (req, res) => {

  const data = req.params;
  User.deleteOne({
    _id: data.id
  }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document

    res.json({
      result: 'ok',
      message: 'User successfully deleted.'
    });


  });


});


module.exports = router;
