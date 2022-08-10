const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { usersInDb, passwordHash } = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const password = await passwordHash('secret');

  const newUser = {
    name: 'test',
    username: 'root',
    password,
  };

  const user = User(newUser);
  await user.save();
}, 1000000);

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      name: 'test1',
      username: 'daxaka',
      password: 'topSecret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      name: 'test1',
      username: 'root',
      password: 'topSecret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if usernames length is less than 3', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      name: 'test1',
      username: 'da',
      password: 'topSecret',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if passwords length is less than 3', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      name: 'test1',
      username: 'daxaka',
      password: '',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
