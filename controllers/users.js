const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

//Path is /api/users

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const body = req.body;
  if (body.password.length < 3) {
    return res.status(400).json({ error: 'Password requires minimum length of 3.' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const newUser = await user.save();

  res.json(newUser);
});

module.exports = userRouter;