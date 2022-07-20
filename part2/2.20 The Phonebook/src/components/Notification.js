const Notification = ({ type, message }) => {
  return (
    <div className={type === "error" ? "error" : "success"}>{message}</div>
  );
};

export default Notification;
