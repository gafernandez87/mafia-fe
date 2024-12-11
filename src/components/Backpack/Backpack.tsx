import styles from './Backpack.module.css';

const Backpack = ({backpack, setCurrentPage}: any) => {

  const handleClick = () => {
    // go to market
    setCurrentPage('market');
  }

  return (
   <div className={styles.backpackContainer}>
    {backpack.length === 0 && 
      <div className={styles.emptyBackpack}>
        <h4>Mochila vacía</h4>
        <button onClick={handleClick} className='coolButton'>Comprar</button>
      </div>
    }
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