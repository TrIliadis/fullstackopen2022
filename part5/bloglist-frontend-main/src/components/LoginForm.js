const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password </label>
        <input
          id='password'
          type='password'
          name='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
