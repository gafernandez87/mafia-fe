import styles from './Footer.module.css';

const menuItem = ['people', 'backpack', 'market', 'faq'];

const Footer = ({active, setActive}: any) => {

  return (
    <ul className={styles.footerContainer}>
      {menuItem.map((item) => (
        <li key={item} className={active === item ? styles.selected : ''} 
          onClick={() => setActive(item)}
        >
          <img src={`icons/${item}.svg`} alt={item} className={item === 'backpack' || item === 'faq' ? styles.midSize : ''}></img>
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Footer;