function NotificationCard({ notification }) {
  console.log(notification);
  return (
    <div>
      <div>
        <h3>Your message: {notification.message}</h3>
        <h4>Admin replied: {notification.replies.message}</h4>
      </div>
    </div>
  );
}
export default NotificationCard;
