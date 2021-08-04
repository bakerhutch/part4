/* eslint-disable no-undef */
//Just testing HTTP GET request to /api/blogs using .then
//Then refactor using async/await

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./init_helper/blog_init_helper');

const api = supertest(app);

beforeEach(async () => {
  //Deletes all entries from database
  await Blog.deleteMany({});
  //Adds blog entries
  await Blog.insertMany(helper.initialBlogs);
});

describe('fetching current list of blogs', () => {
  //Tests response's body length.
  test('correct length of blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('notes returned as json', async () => {
    await api.get('/api/blogs').expect('Content-Type', /application\/json/);
  });
});

describe('viewing a specific note', () => {
  test('verifies _id identifier', async () => {
    const ident = helper.initialBlogs[0]._id.toString();
    const response = await api.get(`/api/blogs/${ident}`);
    expect(response.body.id).toBeDefined();
  });

  test('fails with 404 if note does not exist', async () => {

  });

  test('fails with 400 if id is invalid', async() => {

  });
});

describe('adding a new note', () => {
  test('succeeds with content saved correctly', async () => {
    await api
      .post('/api/blogs')
      .send(helper.BlogPost)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    //Total number of blogs +1
    const expectedBlogs = helper.initialBlogs.concat(helper.BlogPost);
    const result = await Blog.countDocuments({});
    expect(result).toBe(expectedBlogs.length);

    //Content of blog post is saved correctly
    const blogEntry = await Blog.findOne(helper.BlogPost);
    expect(blogEntry.title).toContain(helper.BlogPost.title);
  });

  test('verifies POST is missing likes property', async () => {
    const woLikes = helper.BlogPost;
    delete woLikes.likes;
    const response = await api.post('/api/blogs').send(woLikes).expect(200);
    const lastEntry = await Blog.findById(response.body.id);
    expect(lastEntry.likes).toBe(0);
  });

  test('verifies POST rejects request missing title or url', async () => {
    const woTitle = helper.BlogPost;
    const woUrl = helper.BlogPost;
    delete woTitle.title;
    delete woUrl.url;

    await api
      .post('/api/blogs')
      .send(woTitle)
      .expect(400);

    await api
      .post('/api/blogs')
      .send(woUrl)
      .expect(400);

    const allEntries = await Blog.countDocuments();
    expect(allEntries).toBe(helper.initialBlogs.length);
  });
});

describe('deleting a note', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const id = helper.initialBlogs[0]._id;
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204);
    
    const blogList = await Blog.find();
    expect(blogList).toHaveLength(helper.initialBlogs.length-1);
    expect(blogList).not.toContain(id);
  });
});

describe('updating an existing note', () => {
  test('succeeds with status 200 and returns new note', async () => {
    const firstEntry = helper.initialBlogs[0];
    const updatedBlog = {
      ...firstEntry,
      likes: firstEntry.likes + 1
    };
    const response = await api
      .put(`/api/blogs/${firstEntry._id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(firstEntry.likes+1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
