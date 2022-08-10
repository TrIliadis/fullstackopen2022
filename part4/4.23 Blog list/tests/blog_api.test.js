const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const { initialBlogs, blogsInDb, nonValidId } = require('./test_helper');

const api = supertest(app);

let token = '';

beforeEach(async () => {
  await Blog.deleteMany({});

  const loginInfo = {
    username: 'root',
    password: 'secret',
  };

  const res = await supertest(app).post('/api/login').send(loginInfo);
  token = res.body.token;

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
}, 1000000);

describe('when there is initially some notes saved', () => {
  test('blog list application returns the correct amount of blog posts', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(res.body).toHaveLength(initialBlogs.length);
  });
});

test('verifies that the unique identifier property of the blog posts is named id', async () => {
  const blogs = await blogsInDb();

  for (const blog of blogs) {
    expect(blog.id).toBeDefined();
  }
});

describe('addition of a new blog', () => {
  test('success with valid data', async () => {
    const newBlog = {
      title: 'HTTP POST req test',
      author: 'Triliadis',
      url: 'localhost',
      likes: 3,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    const author = blogsAtEnd.map((blog) => blog.author);
    const url = blogsAtEnd.map((blog) => blog.url);
    const likes = blogsAtEnd.map((blog) => blog.likes);

    expect(titles).toContain('HTTP POST req test');
    expect(author).toContain('Triliadis');
    expect(url).toContain('localhost');
    expect(likes).toContain(3);
  });

  test('if the likes property is missing from the request, it will default to 0', async () => {
    const newBlog = {
      title: 'HTTP POST req test',
      author: 'Triliadis',
      url: 'localhost',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    const addedBlog = blogsAtEnd.filter((blog) => blog.title === newBlog.title);
    expect(addedBlog[0].likes).toBe(0);
  });

  test('if the title and url properties are missing, the backend responds with code 400 Bad Request', async () => {
    const newBlog = {
      author: 'Triliadis',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('if token is missing when adding a blog, it will fail', async () => {
    const blogsAtStart = await blogsInDb();

    const newBlog = {
      title: 'HTTP POST req test',
      author: 'Triliadis',
      url: 'localhost',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

describe('tests for blog deletion', () => {
  test('deletion with valid id', async () => {
    const blogsAtStart = await blogsInDb();

    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).not.toContain(blogToDelete.title);
  });

  test('deletion with non valid id', async () => {
    const id = nonValidId();
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});

describe('tests for editing blog', () => {
  test('editing blog with valid id', async () => {
    const blogsAtStart = await blogsInDb();
    const editedBlog = { ...blogsAtStart[0], title: 'Make It Blue', likes: 22 };

    await api.put(`/api/blogs/${editedBlog.id}`).send(editedBlog).expect(204);

    const blogsAtEnd = await blogsInDb();
    const blogs = blogsAtEnd.map((blog) => {
      const objectToAdd = {
        title: blog.title,
        likes: blog.likes,
      };
      return objectToAdd;
    });
    expect(blogs).toContainEqual({ title: 'Make It Blue', likes: 22 });
  });

  test('editing blog with invalid id', async () => {
    const id = await nonValidId();
    const blogsAtStart = await blogsInDb();
    const editedBlog = { ...blogsAtStart[0], title: 'Make It Blue' };

    await api.put(`/api/blogs/${id}`).send(editedBlog).expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
