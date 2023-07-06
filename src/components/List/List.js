import React from "react";
import styles from "./List.module.scss"
import { ListElement } from "../ListElement/ListElement";
import { useSelector } from "react-redux";
import * as selectors from "../../redux/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadArticles, setPage } from "../../redux/actions";
import { Pagination } from "antd";

export const List = () => {

   const articles = useSelector(selectors.articles);
   const page = useSelector(selectors.page);
   const dispatch = useDispatch();

   
useEffect(()=>{
   dispatch(loadArticles(page))
 },[page]);


 const handlerOnChangePage = (page) => {
   dispatch(setPage(page));

   window.scrollTo({
     top: 0,
     left: 0,
     behavior: 'smooth',
   });
 };


   console.log(articles,'IN LIST');

   const list = articles.map((item)=>{

      return <ListElement {...item}/>
   })
   return (

      <div className={styles.list}>

        {list}
      <Pagination current={page} onChange={handlerOnChangePage} 
      defaultPageSize={20}
      showSizeChanger={false} total={1000}/>
      </div>
   )
}