import mongoose from 'mongoose';
import { UsersSchema } from '../models/users';
import bcrypt from 'bcrypt';
import Sample from '../components/Sample';

const User = mongoose.model('User', UsersSchema);

export const getUser = (req, res) => {

  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }

    res.json(users)
  });

};

export const addUser = (req, res) => {
  const user = new User();
  const saltRounds = 10;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordMatch = req.body.passwordMatch;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    user.username = username;
    user.email = email;
    user.password = hash;

    user.save().then( () => {
      res.json({ message: 'User successfully added!' });
      res.send({redirect: 'Sample'});
      // console.log("res!", res);
    }).catch(error => {
      res.send(error);
      console.log(error);
    });
  });

  // user.save().then( () => {
  //   res.json({ message: 'User successfully added!' });
  // }).catch(error => {
  //   res.send(error);
  //   console.log(error);
  // });
};


export const deleteUser = (req, res) => {

  User.remove({ _id: req.params._id }, function(err, site) {

    if (err)
      res.send(err);

    res.json({ message: 'User has been deleted' })

  })
};
