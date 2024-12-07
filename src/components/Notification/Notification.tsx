import styles from './notification.module.css';

const Notification = ({ message, visible, handleOk }: any) => {
  if (!visible) return null;
  return (
    <div className={styles.notification}>
      {message}
      <button onClick={handleOk} className={styles.coolButton}>OK</button>
    </div>
  );
};

export default Notification;