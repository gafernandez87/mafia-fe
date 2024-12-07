
// Style
import styles from "../Main/Main.module.css";

const renderJob = (player: any, me: any) => {
  return <span className={styles.job}>
    {(player.id === me.id || me.isAdmin) &&
      <img src={`${player.job}.png`}
        className={styles.jobImage}
        alt={player.job} />
    }
    <img src={`${player.status}.png`} alt={player.status} />
  </span>;
}

const Player = ({ player, me, handleClick, selected, disabled }: any) => {
  const classes = [styles.player];
  if (selected) classes.push(styles.selected);
  if (disabled) classes.push(styles.disabled);
  const clickeable = !disabled &&
    (player.id !== me.id ||
      (player.id === me.id && me.job === 'medico')
    );

  return (
    <li className={classes.join(' ')} onClick={() => clickeable && handleClick(player.id)}>
      <span>{player.name}</span>
      {renderJob(player, me)}
    </li>
  );
};

export default Player;