const CreateBlogForm = ({
  handleBlogCreation,
  setTitle,
  setAuthor,
  setUrl,
}) => {
  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          <label htmlFor='title'>title: </label>
          <input
            id='title'
            type='text'
            onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
          <label htmlFor='author'>author: </label>
          <input
            id='author'
            type='text'
            onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
          <label htmlFor='url'>url: </label>
          <input
            id='url'
            type='text'
            onChange={({ target }) => setUrl(target.value)}></input>
        </div>
        <br />
        <button>Create Blog</button>
      </form>
    </>
  );
};

export default CreateBlogForm;
