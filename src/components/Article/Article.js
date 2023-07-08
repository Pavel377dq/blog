import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React from "react";
import { ListElement } from "../ListElement/ListElement";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {  fetchArticle, selectArticle, selectError, selectStatus } from '../../redux/store/articleSlice';
import { Spin,Alert } from "antd";
import styles from './Article.module.scss'


export const Article = () =>{

   const { slug } = useParams();
   const dispatch = useDispatch();
   const article = useSelector(selectArticle);
   const error = useSelector(selectError);
   const status = useSelector(selectStatus);
   const { body } = article;

   useEffect(()=>{
      if(slug){
         dispatch(fetchArticle(slug));
      }
   },[slug]);


  
 if(status === 'pending'){

   return  <div className={styles.spin}><Spin  size="large" /></div>
 }

 if(status === 'rejected'){
   return   <Alert message="Error" description={error} type="error" showIcon />
 }

   return (
      <div className={styles.wrap}>
         <ListElement {...article}></ListElement>
         <ReactMarkdown className={styles.markdown} children={body}/>
      </div>
   )
}