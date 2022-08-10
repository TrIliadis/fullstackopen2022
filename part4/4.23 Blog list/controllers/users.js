const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs');
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body;

  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: 'username must be at least 3 characters long' });
  }
  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: 'password must be at least 3 characters long' });
  }
  if (await User.findOne({ username })) {
    return res.status(400).json({ error: 'username must be unique' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = {
    name,
    username,
    password: passwordHash,
  };

  const newUser = new User(user);
  await newUser.save();

  res.status(201).json(newUser);
});

module.exports = usersRouter;
