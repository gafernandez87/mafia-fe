import { useState } from 'react';
import styles from './Footer.module.css';

const menuItem = ['people', 'backpack', 'market', 'faq'];

const Footer = ({active, setActive}: any) => {

  return (
    <ul className={styles.footerContainer}>
      {menuItem.map((item) => (
        <li key={item} className={active === item ? styles.selected : ''} 
          onClick={() => setActive(item)}
        >
          <img src={`icons/${item}.png`} alt={item}></img>
        </li>
      ))}
    </ul>
  );
};

export default Footer;