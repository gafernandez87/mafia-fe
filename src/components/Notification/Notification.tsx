import styles from './notification.module.css';

const Notification = ({ message, visible, okLabel, cancelLabel, handleOk, handleCancel }: any) => {
  if (!visible) return null;
  return (
    <div className={styles.notification}>
      {message}
      <span className={styles.buttonSection}>
        <button onClick={handleOk} className="coolButton">{okLabel || 'Ok'}</button>
        {handleCancel && <button onClick={handleCancel} className={['coolButton', styles.cancel].join(' ')}>{cancelLabel || 'Cancelar'}</button>}
      </span>
    </div>
  );
};

export default Notification;