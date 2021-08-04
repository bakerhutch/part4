const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
//Path is "/api/blogs"

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    response.status(400).json({ error: 'Incomplete entry.' });
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
    });

    const result = await blog.save();
    response.json(result);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  //Return doc with id
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const entry = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true});
  response.json(entry);
});

module.exports = blogsRouter;