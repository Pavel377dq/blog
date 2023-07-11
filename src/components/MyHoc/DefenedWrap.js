import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectIsLogin } from '../../redux/store/userSlice';



export const  DefendedWrapper = ({ redirectPath = '/', auth = false }) => {
  
   const isLogin = useSelector(selectIsLogin);
  const location = useLocation();



  if (auth) {

  //  const fromPath = location.state?.from;
    //console.log(fromPath,'fromPath');
    //const path = (!fromPath || fromPath === '/sign-in' || fromPath === '/sign-up') &&  redirectPath;//возможно неверно тест

    return !isLogin ? <Outlet /> : <Navigate to={redirectPath} />;//path


  }
  return isLogin ? <Outlet /> : <Navigate to={redirectPath} />;
}


