
// Style
import styles from "../Main/Main.module.css";

const Lobby = ({ me, players, adminSelect, initGame }: any) => {
  return (
    <>
      <h1>Sala de espera</h1>
      <div className={styles.adminSelect}>
        <label>Moderador</label>
        <select onChange={e => adminSelect(e.target.value)}>
          <option value="">Seleccionar...</option>
          {players.map((p: any) => {
            return <option key={p.id} value={p.id}>{p.name}</option>
          })}
        </select>
      </div>
      <ul className={styles.lobbyPlayers}>
        {players.map((p: any) => (
          <li key={p.id} className={styles.player}>
            {p.name}
            {p.isAdmin ? <img src="eye.png" alt="admin" /> : null}
          </li>
        ))}
      </ul>
      {me?.isAdmin &&
      <button
        onClick={initGame}
        style={{ width: '100%' }}
        className={styles.coolButton}>Empezar</button>
      }
    </>
  )
}

export default Lobby;