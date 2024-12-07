
// Style
import styles from "./Player.module.css";

const formatMoney = (value: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const Player = ({ me }: any) => {

  return (
    <div className={styles.playerContainer}>

      <div className={styles.role}>
        <img src={`roles/${me.job}.webp`} alt={me.job} className={styles.jobImage} />
        <span className={styles.jobTitle}>{me.job}</span>
      </div>
      
      <div className={styles.stats}>
        <span className={styles.playerName}>{me.name}</span>
        <span className={styles.hp}>
          <img src={`heart.png`} />
          <img src={`heart.png`} />
        </span>
        <span className={styles.money}>{formatMoney(me.money)}</span>
      </div>

    </div>
  );
};

export default Player;