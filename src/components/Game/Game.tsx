import { useEffect, useState } from 'react';

// Components 
import Player from '../Player/Player';

// Style
import styles from "./Game.module.css";
import AllPlayers from '../AllPlayers/AllPlayers';
import Footer from '../Footer/Footer';
import Backpack from '../Backpack/Backpack';
import Market from '../Market/Market';

const Game = ({ game, me, onEmit}: any) => {
  const [target, setTarget] = useState<any | null>(null);
  const [market, setMarket] = useState<any | null>(null);
  const [backpack, setBackpack] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState('people');

  useEffect(() => {
    setMarket(game.market);
  }, [game])

  useEffect(() => {
    setBackpack(me.backpack);
  }, [me])

  const selectTarget = (who: any) => {
    if (target && target.id === who) {
      setTarget(null);
    } else {
      const target = game.players.find((p: any) => p.id === who);
      setTarget(target);
    }
  }

  const handleBuyItem = (item: any) => {
    onEmit('buy', {item, player: me});
  };

  if (!me) return <div>Loading...</div>;
  
  return (
    <div className={styles.gameContainer}>
        <section className={styles.body}>
          <h2 className={styles.title}>Dia {game.dayCount}</h2>
          {currentPage === 'people' && (
            <>
              <Player me={me}></Player>
              <AllPlayers players={game.players} me={me} />
            </>
          )}

          {currentPage === 'backpack' && (
            <Backpack backpack={backpack} setCurrentPage={setCurrentPage} />
          )}

          {currentPage === 'market' && (
            <Market market={market} me={me} buyItem={handleBuyItem} />
          )}

          {currentPage === 'faq' && (
            <>FAQ</>
          )}
        </section>
        <Footer active={currentPage} setActive={setCurrentPage} />
    </div>
  );
}

export default Game;