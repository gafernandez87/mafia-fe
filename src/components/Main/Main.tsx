import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { API_HOST, SESSION_COOKIE } from "../../utils/constants";
import socketIOClient from "socket.io-client";

// Style
import styles from "./Main.module.css";

import Notification from "../Notification/Notification";
import Lobby from "../Loby/Lobby";
import Game from "../Game/Game";
import { useNavigate } from "react-router-dom";

var socket: any;

const Main: React.FC = () => {

    const [game, setGame] = useState<any | null>(null);
    const [me, setMe] = useState(null);
    const [cookies] = useCookies([SESSION_COOKIE]);
    const navigate = useNavigate();

    const [notification, setNotification] = useState<any>({
        visible: false,
        message: '',
    });

    useEffect(() => {
        const sessionId = cookies[SESSION_COOKIE];
        if(!sessionId) navigate('/');

        // socket = socketIOClient();
        socket = socketIOClient(`${API_HOST}:4001`, {
            withCredentials: true,
            transports: ['websocket']
        });
        

        socket.on("connect_error", (err: any) => {
          // the reason of the error, for example "xhr poll error"
          console.log(err);
        });
        
        
        socket.on("connect", () => {
          socket.emit('game');
            // if(!me && game) {
            //   const found = game.players.find((p: any) => p.id === sessionId);
            //   console.log(found);
            //   setMe(found);
            // }
        });

        socket.on("game", (game: any) => {
          if (game) {
            console.log('game',game)
              if (game.status === 'game_over') {
              setNotification({
                  visible: true,
                  message: (
                  <>
                      <h3>Juego terminado</h3>
                      <p style={{ fontSize: '20px', marginBottom: '40px' }}>
                      Ganó {game.winner === 'pueblo' ? 'el pueblo!' : 'la mafia!'}
                      </p>
                  </>
                  ),
              });
              } else {
                setGame(game);

                if (!me) {
                    const me = game.players.find((p: any) => p.id === sessionId);
                    setMe(me);
                }

                if (game.turn === 'policia') {
                    const police = game.players.find((p: any) => p.job === 'policia');
                    if (police.status === 'dead') {
                    setTimeout(() => {
                        socket.emit("changeTurn", { nextTurn: "admin", from: 'policia' });
                    }, 3000);
                    }
                } else if (game.turn === 'medico') {
                    const medic = game.players.find((p: any) => p.job === 'medico');
                    if (medic.status === 'dead') {
                    setTimeout(() => {
                        socket.emit("changeTurn", { nextTurn: "admin", from: 'medico' });
                    }, 3000);
                    }
                }
              }
          }
        });

        socket.on("investigate", (result: any) => {
          setNotification({
              visible: true,
              message: (
              <>
                  <b style={{ fontSize: '17px' }}>Resultado de la investigacion:</b>
                  <h2>{result ? <b style={{ color: 'green' }}>POSITIVO</b> : <b style={{ color: 'red' }}>NEGATIVO</b>}</h2>
              </>
              ),
          });
          socket.emit("changeTurn", { nextTurn: "admin" });
        });

    }, []);

    const emit = (event: any, data: any = null) => {
      console.log(event, data)
      socket.emit(event, data);
    }

    const adminSelect = (value: any) => {
      socket.emit('setAdmin', value);
    }

    const initGame = () => {
      if (game.players?.length < 4) {
        setNotification({
          visible: true,
          message: <h3>Se necesitan al menos 4 jugadores para comenzar</h3>,
        });
      } else {
        emit('beginGame');
      }
    }

    const closeModal = () => {
      setNotification({ visible: false, message: '' });
    }

    if (!game) return <div>Loading...</div>;

    return (
      <div className={styles.game}>
        <Notification
          visible={notification.visible}
          message={notification.message}
          handleOk={closeModal} 
        />

        {game.status === 'new' &&
          <Lobby
            me={me}
            players={game.players}
            initGame={initGame}
            adminSelect={adminSelect} 
          />
        }

        {game.status === 'in_progress' &&
          <Game me={me} game={game} onEmit={emit}/>
        }
      </div>
    );
};

export default Main;