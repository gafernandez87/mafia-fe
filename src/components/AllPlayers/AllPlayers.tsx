import { useCookies } from 'react-cookie';
import styles from './AllPlayers.module.css';
import { useEffect, useState } from 'react';
import { PLAYER_GUESS } from '../../utils/constants';

const allJobs = ['mafia', 'policia', 'medico', 'pueblo'];

const AllPlayers = ({ players, me }: any) => {
  const [cookies, setCookie] = useCookies([PLAYER_GUESS]);
  const [playerGuess, setPlayerGuess] = useState<any>({});

  useEffect(() => {
    let playerGuess = cookies[PLAYER_GUESS];
    if(!playerGuess) {
      playerGuess = players.reduce((acc: any, player: any) => {
        if(player.id !== me.id) {
          acc[player.id] = 'pueblo';
        }
        return acc;
      }, {});
      setCookie(PLAYER_GUESS, JSON.stringify(playerGuess));
    } else {
      setPlayerGuess(playerGuess);
    }
  }, []);

  const getPlayerGuess = (playerId: string) => {
    return playerGuess[playerId] || 'pueblo';
  }

  const changeGuess = (playerId: string) => () => {
    const currentIndex = allJobs.indexOf(playerGuess[playerId]);
    const newIndex = (currentIndex + 1) % allJobs.length;
    const newGuess = allJobs[newIndex];
    setPlayerGuess({...playerGuess, [playerId]: newGuess});
    setCookie(PLAYER_GUESS, JSON.stringify({...playerGuess, [playerId]: newGuess}));
  }
  
  return (
    <div className={styles.allPlayersContainer}>
      <h4>Jugadores:</h4>
      <div className={styles.playerList}>
        {players.filter((p:any) => p.id !== me?.id).map((player: any) =>(
          <div key={player.id} className={styles.player} onClick={changeGuess(player.id)}>
            <img src={`roles/${getPlayerGuess(player.id)}.webp`} />
            <span className={styles.playerName}>{player.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AllPlayers;