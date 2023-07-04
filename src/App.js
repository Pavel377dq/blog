import { List } from "./components/List/List"
import styles from "./App.module.scss"
function App() {



  return (
    <div className={styles.header}>
      <div className={styles.wrap}>
        <h3 className={styles.title}>Realworld Blog</h3> 
        <div>
          <button className={styles.in}>Sign In</button>
          <button className={styles.up}>Sign Up</button>
        </div>
      </div>
      <List/>
    </div>
    
  );
}

export default App;
