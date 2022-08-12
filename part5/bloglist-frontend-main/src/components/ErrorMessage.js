import '../index.css';

const ErrorMessage = ({ message, messageType }) => {
  return (
    <div className={`${messageType === 'error' ? 'error' : 'success'}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;
