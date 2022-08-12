const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const { title, url, likes, author } = req.body;

  // userExtractor middleware failed to find the user/token
  if (!req.user.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(req.user.id);
  const newBlog = {
    title,
    url,
    likes,
    author,
    user: user.id,
  };
  const blog = new Blog(newBlog);

  const result = await blog.save();
  user.blogs.push(blog);
  await user.save();
  res.status(201).json(result);
});

blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // tokenExtractor middleware failed to find the token
  if (!req.user.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(id);
  if (!blog) throw Error('Could not find a blog with this id');

  if (blog.user.toString() === req.user.id) {
    const result = await Blog.findByIdAndDelete(id);
    if (result) res.status(204).end();
  } else {
    return res.status(401).json({ error: 'not allowed to delete blog' });
  }
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
