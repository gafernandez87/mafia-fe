
// Style
import Chip from "../Chip/Chip";
import styles from "./Player.module.css";

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
        <Chip>${me.money}</Chip>
      </div>

    </div>
  );
};

export default Player;