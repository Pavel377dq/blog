import { List } from "./components/List/List"
import { Article } from "./components/Article/Article";
import styles from "./App.module.scss"
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RegisterForm } from "./components/RegisterForm/RegisterForm";

function App() {

const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.wrap}>
        <h3 className={styles.title}>Realworld Blog</h3> 
        <div>
          <button className={styles.in}>Sign In</button>
          <button  onClick={() => navigate('/sign-up')}
           className={styles.up}>Sign Up</button>
        </div>
      </div>


      <Routes>
          <Route path="/" element={<List />} />
          <Route path="/articles" element={<List />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/sign-up" element={<RegisterForm />} />
      </Routes>
    </div>
    
  );
}

export default App;
