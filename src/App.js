import { List } from "./components/List/List"
import { Article } from "./components/Article/Article";
import { Route, Routes } from 'react-router-dom';
import { SignUp } from "./components/SignUp/SignUp";
import { SignIn } from "./components/SignIn/SignIn";
import {DefendedWrapper} from "./components/MyHoc/DefenedWrap";
import { Header } from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsCurentUserLoading, getCurrentUser  } from "./redux/store/userSlice";

function App() {
  
  const isCurrentUserLoading = useSelector(selectIsCurentUserLoading);
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);



  if (isCurrentUserLoading) {
    return null;
  }
//const navigate = useNavigate();

  return (
    <div>
  

      <Header/>
      <Routes>
          <Route path="/" element={<List />} />
          <Route path="/articles" element={<List />} />
          <Route path="/articles/:slug" element={<Article />} />
        <Route element={<DefendedWrapper auth={true} />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn/>} />
        </Route >
      </Routes>
    </div>
    
  );
}

export default App;
