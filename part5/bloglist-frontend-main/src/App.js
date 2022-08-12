import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogList from './components/BlogList';
import Message from './components/ErrorMessage';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsernameChange = (username) => {
    setUsername(username);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleTitleChange = (title) => {
    setTitle(title);
  };

  const handleAuthorChange = (author) => {
    setAuthor(author);
  };

  const handleUrlChange = (url) => {
    setUrl(url);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        username,
        password,
      };

      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('user', JSON.stringify(user));
      setMessage(`Welcome ${user.name}`);
      setMessageType('success');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (e) {
      setMessage('Wrong username or password');
      setMessageType('error');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setMessage(`Goodbye ${user.name}`);
    setMessageType('success');
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setUser(null);
  };

  const handleBlogCreation = (e) => {
    e.preventDefault();
    const blogInfo = {
      url,
      title,
      author,
    };
    blogService.createBlog(blogInfo);
    setMessage(`A new blog ${title} by ${author} was successfully created`);
    setMessageType('success');
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      {message === null ? (
        ''
      ) : (
        <Message message={message} messageType={messageType} />
      )}
      {user === null ? (
        <LoginForm
          setPassword={handlePasswordChange}
          setUsername={handleUsernameChange}
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      ) : (
        <BlogList
          blogs={blogs}
          name={user.name}
          handleLogout={handleLogout}
          handleBlogCreation={handleBlogCreation}
          setTitle={handleTitleChange}
          setAuthor={handleAuthorChange}
          setUrl={handleUrlChange}
        />
      )}
    </div>
  );
};

export default App;

