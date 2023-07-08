import React from "react";
import styles from "./List.module.scss"
import { ListElement } from "../ListElement/ListElement";
import { useSelector } from "react-redux";
//import * as selectors from "../../redux/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//import { loadArticles, setPage } from "../../redux/actions";
import { Pagination, Spin,Alert } from "antd";
import {
   fetchArticles,
   selectAllArticles,
   selectArticlesCount,
   selectCurrentPage,
   setCurrentPage,
   selectStatus,
   selectError
 } from '../../redux/store/articleListSlice';

export const List = () => {

   const articles = useSelector(selectAllArticles);
   const page = useSelector(selectCurrentPage);
   const status = useSelector(selectStatus);
   const error = useSelector(selectError);
   const dispatch = useDispatch();

   
useEffect(()=>{
   dispatch(fetchArticles(page))
 },[page]);



 if(status === 'pending'){

   return   <div className={styles.spin}><Spin  size="large" /></div>
 }

 if(status === 'rejected'){
   return   <Alert message="Error" description={error} type="error" showIcon />
 }

 const handlerOnChangePage = (page) => {
   dispatch(setCurrentPage(page));

   window.scrollTo({
     top: 0,
     left: 0,
     behavior: 'smooth',
   });
 };


   console.log(articles,'IN LIST');

   const list = articles? articles.map((item)=>{

      return <div className={styles.element}><ListElement {...item}/></div>
   }):null;
   return (

      <div className={styles.list}>

        {list}
      <Pagination className={styles.pagination} current={page} onChange={handlerOnChangePage} 
      defaultPageSize={20}
      showSizeChanger={false} total={1000}/>
      </div>
   )
}