import React from "react";
import styles from "./List.module.scss"
import { ListElement } from "../ListElement/ListElement";
import { useSelector } from "react-redux";
import * as selectors from "../../redux/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadArticles } from "../../redux/actions";
export const List = () => {

   const articles = useSelector(selectors.articles);
   const dispatch = useDispatch();

   
useEffect(()=>{
   dispatch(loadArticles())
 },[]);
   console.log(articles,'IN LIST');

   return (

      <div className={styles.list}>

         <ListElement/>
         <ListElement/>
         <ListElement/>
         <ListElement/>

      </div>
   )
}