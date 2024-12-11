import styles from './Chip.module.css';

const Chip = ({ children, type = 'success' }: any) => {
  return (
    <div className={[styles.chip, styles[type]].join(' ')}>
      {children}
    </div>
  );
};

export default Chip;