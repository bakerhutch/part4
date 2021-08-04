/* eslint-disable no-undef */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const helper = require('./init_helper/user_init_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany();
  await User.insertMany(helper.hashedUsers);
});

//Below created before addition of hashedUsers list which contains the hashed passwords. Issues with Jest timer in trying to generate hashed passwords to pass to test db. helper.createHashedUsers() in beforeAll().
/* describe('initial passwordHash generation test', () => {
  test('confirming list provides salty passwords', async () => {
    expect(list[0]).toHaveProperty('passwordHash');
    expect(list[0]).not.toHaveProperty('password');
  });
  test('confirm db contains list', async () => {
    const response = await User.find();
    expect(response).toHaveLength(list.length);
  });
}); */

//Check invalid users are not created and invalid add user operation returns a suitable status code and error message
describe('get users', () => {
  test('list of users received and responds with 200', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.hashedUsers.length);
    expect(response.body[0]).not.toHaveProperty('passwordHash');
  });
});

afterAll(() => {
  mongoose.connection.close();
});