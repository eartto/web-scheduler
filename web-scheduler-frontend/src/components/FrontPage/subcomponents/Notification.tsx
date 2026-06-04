const Notification = ({ message }: { message: string | null }) => {
  if (message) {
    return (
      <div>
        <p className="error-message">{message}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
