// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogPosts) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  blogPosts.reduce((sum, item) => sum + item.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  if (blogs.length === 1) return blogs[0];
  let favBlogIndex = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > blogs[favBlogIndex].likes) {
      favBlogIndex = i;
    }
  }
  return blogs[favBlogIndex];
};

const mostBlogs = (blogs) => {
  let max = 0;
  let index = 0;
  if (blogs.length === 0) return {};
  if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 };
  for (let i = 0; i < blogs.length; i++) {
    let counter = 1;
    for (let j = i + 1; j < blogs.length; j++) {
      if (blogs[i].author === blogs[j].author) counter++;
    }
    if (counter > max) {
      max = counter;
      index = i;
    }
  }
  return { author: blogs[index].author, blogs: max };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  if (blogs.length === 1) {
    return { author: blogs[0].author, likes: blogs[0].likes };
  }
  let max = 0;
  let index = 0;
  for (let i = 0; i < blogs.length; i++) {
    let counter = blogs[i].likes;
    for (let j = i + 1; j < blogs.length; j++) {
      if (blogs[i].author === blogs[j].author) {
        counter += blogs[j].likes;
      }
    }
    if (counter > max) {
      max = counter;
      index = i;
    }
  }
  return { author: blogs[index].author, likes: max };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
