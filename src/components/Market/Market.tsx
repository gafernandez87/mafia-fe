import { useEffect, useState } from 'react';
import styles from './Market.module.css';
import Notification from '../Notification/Notification';
import Chip from '../Chip/Chip';

const Market = ({me, market, buyItem}: any) => {
  const [items, setItems] = useState([]);
  const [notification, setNotification] = useState<any>(null);
  
  useEffect(() => {
    if(me.job === 'mafia') {
      setItems(market.badItems);
    } else {
      setItems(market.goodItems);
    }
  }, [me, market]);

  const handleItemClick = (item: any) => {
    if(item.stock === 0 || item.price > me.money) return;
    setNotification({
      title: `Estas por comprar ${item.name} por $${item.price}`,
      handleOk: () => {
        handleBuy(item);
        setNotification(null);
      },
      handleCancel: () => setNotification(null)
    });
  }

  const handleBuy = (item: any) => {
    buyItem(item);
  }

  const getStock = (stock: number) => {
    if(stock === -1) return "∞";
    return stock;
  }

  return (
   <div className={styles.marketContainer}>
    
    <Notification
        visible={notification !== null}
        message={notification?.title}
        okLabel="Confirmar"
        handleOk={notification?.handleOk} 
        handleCancel={notification?.handleCancel} 
    />

    <div className={styles.header}>
      <h2>Mercado</h2>
      <Chip>${me.money}</Chip>
    </div>
    <ul className={styles.marketItems}>
      {items.map((item: any) => (
        <li key={item.name} onClick={() => handleItemClick(item)}>
          <img src={`items/${item.name}.png`} />
          <div className={styles.stock}>
            <span>{item.name}</span>
            <span>Stock: {getStock(item.stock)}</span>
          </div>
          <span className={styles.price}>${item.price}</span>
        </li>
      ))}
    </ul>
   </div>
  );
};

export default Market;