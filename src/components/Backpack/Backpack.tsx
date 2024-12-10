import { useState } from 'react';
import styles from './Backpack.module.css';

const Backpack = ({backpack, setCurrentPage}: any) => {

  const handleClick = () => {
    // go to market
    setCurrentPage('market');
  }

  return (
   <div className={styles.backpackContainer}>
    <ul className={styles.backpackItems}>
      {backpack.map((item: any, index: number) => (
        <li key={item.name}>
          <img src={`items/${item.name}.png`} />
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
   </div>
  );
};

export default Backpack;