import Blog from './Blog';
import CreateBlogForm from './CreateBlogForm';

const BlogList = ({
  blogs,
  name,
  handleLogout,
  handleBlogCreation,
  setTitle,
  setAuthor,
  setUrl,
}) => {
  return (
    <div>
      <h2>
        <b>blogs</b>
      </h2>
      <p>
        <b>{name}</b> logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <CreateBlogForm
        handleBlogCreation={handleBlogCreation}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
      />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
