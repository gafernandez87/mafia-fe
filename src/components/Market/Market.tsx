import { useEffect, useState } from 'react';
import styles from './Market.module.css';

const Market = ({me, market, buyItem}: any) => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    if(me.job === 'mafia') {
      setItems(market.badItems);
    } else {
      setItems(market.goodItems);
    }
  }, [me, market]);

  const handleClick = (item: any) => {
    if(item.stock === 0 || item.price > me.money) return;
    buyItem(item);
  }

  const getStock = (stock: number) => {
    if(stock === -1) return "∞";
    return `x${stock}`;
  }

  return (
   <div className={styles.marketContainer}>
    <div className={styles.header}>
      <h2>Mercado</h2>
      <span>${me.money}</span>
    </div>
    <ul className={styles.marketItems}>
      {items.map((item: any) => (
        <li key={item.name} onClick={() => handleClick(item)}>
          <img src={`items/${item.name}.png`} />
          <span>{item.name} {getStock(item.stock)}</span>
          <span className={styles.price}>${item.price}</span>
        </li>
      ))}
    </ul>
   </div>
  );
};

export default Market;