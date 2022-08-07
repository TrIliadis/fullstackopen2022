const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
});

blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Blog.findByIdAndDelete(id);
  if (result) res.status(204).end();
  else throw Error('Could not find a blog with this id');
});

blogsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true },
  );
  if (updatedBlog) res.status(204).json(updatedBlog);
  else throw Error('Could not find a blog with this id');
});

module.exports = blogsRouter;
