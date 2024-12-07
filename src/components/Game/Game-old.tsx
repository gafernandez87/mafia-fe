import { useState } from 'react';

// Components 
import Player from '../Player/Player';

// Style
import styles from "../Main/Main.module.css";

const events = {
  reset: (emit: any) => emit('reset'),
  toggleDay: (emit: any) => emit('toggleDay'),
  kick: (emit: any, who: any) => emit('kick', who),
  kill: (emit: any, who: any) => emit('kill', who),
  protect: (emit: any, who: any) => emit('protect', who),
  changeTurn: (emit: any, job: any) => emit('changeTurn', { nextTurn: job }),
  investigate: (emit: any, who: any) => emit('investigate', who),
}

const renderAdmin = (game: any, onEmit: any, target: any) => {
  const buttons = [];
  const newDaytime = game.daytime === 'day' ? 'noche' : 'dia';

  if (game.daytime === 'night') {
    const policeDisabled = game.alreadyPlayed.includes('policia');
    const medicDisabled = game.alreadyPlayed.includes('medico');
    const mafiaDisabled = game.alreadyPlayed.includes('mafia');

    buttons.push(<button
      key="mafia"
      style={{ flexGrow: 1 }}
      className={[styles.smallButton, styles.mafiaButton].join(' ')}
      onClick={() => events.changeTurn(onEmit, 'mafia')}
      disabled={mafiaDisabled}>Mafia</button>);
    buttons.push(<button
      key="medico"
      style={{ flexGrow: 1 }}
      className={styles.smallButton}
      onClick={() => events.changeTurn(onEmit, 'medico')}
      disabled={medicDisabled}>Medico</button>);
    buttons.push(<button
      key="policia"
      style={{ flexGrow: 1 }}
      className={[styles.smallButton, styles.policeButton].join(' ')}
      onClick={() => events.changeTurn(onEmit, 'policia')}
      disabled={policeDisabled}>Policia</button>);
  }
  const newDayEnabled = game.alreadyPlayed.length >= 3 || game.daytime === 'day';
  buttons.push(<button
    key="pass"
    onClick={() => events.toggleDay(onEmit)}
    className={[styles.smallButton, styles.pass].join(' ')}
    disabled={!newDayEnabled}>Pasar a {newDaytime}</button>);
  buttons.push(<button
    key="kick"
    disabled={!target}
    style={{ flexGrow: 2 }}
    onClick={() => events.kick(onEmit, target.id)}
    className={styles.smallButton}>Echar {target ? `a ${target.name}` : ''}</button>);
  buttons.push(<button
    key="reset"
    style={{ flexGrow: 2 }}
    onClick={() => events.reset(onEmit)}
    className={styles.smallButton}>Volver a empezar</button>);

  return [...buttons]
}

const renderButtons = (turn: any, me: any, events: any, target: any) => {
  if (me.status === 'dead') return null;
  if (turn !== me.job) return null;

  const classes = [styles.coolButton];
  switch (me.job) {
    case 'mafia': {
      classes.push(styles.mafiaButton);
      return (
        <button disabled={!target} className={classes.join(' ')} onClick={() => events.kill(target.id)}>
          Matar {target ? `a ${target.name}` : ''}
        </button>
      );
    }
    case 'policia': {
      classes.push(styles.policiaButton);
      return (
        <button disabled={!target} className={classes.join(' ')} onClick={() => events.investigate(target.id)}>
          Investigar {target ? `a ${target.name}` : ''}
        </button>
      );
    }
    case 'medico': {
      return (
        <button disabled={!target} className={classes.join(' ')} onClick={() => events.protect(target.id)}>
          Proteger {target ? `a ${target.name}` : ''}
        </button>
      );
    }
    default: return null;
  }
}

const Game = ({ game, me, onEmit }: any) => {
  const [target, setTarget] = useState<any | null>(null);

  const selectTarget = (who: any) => {
    if (target && target.id === who) {
      setTarget(null);
    } else {
      const target = game.players.find((p: any) => p.id === who);
      setTarget(target);
    }
  }

  if (!me) return <div>Loading...</div>;
  return (
    <>
      <h2 className={styles.title}>Dia {game.dayCount}</h2>
      {game.turn !== 'admin' && <h4 className={styles.subtitle}>Es el turno de <b>{game.turn}</b></h4>}
      <div className={[styles.playerList, styles[game.daytime]].join(' ')}>
        <ul>
          {game.players.map((p: any) => {
            if (p.isAdmin) return null;
            const selected = me.job === game.turn && target && target.id === p.id;
            const disabled = p.status === 'dead';
            return (
              <Player
                key={p.id}
                player={p}
                me={me}
                handleClick={selectTarget}
                selected={selected}
                disabled={disabled}
              />
            )
          })}
        </ul>
      </div>
      <div className={styles.buttons}>
        {renderButtons(game.turn, me, events, target)}
        {me.isAdmin && renderAdmin(game, onEmit, target)}
      </div>
    </>
  )
}

export default Game;