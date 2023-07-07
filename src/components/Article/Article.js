import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React from "react";
import { ListElement } from "../ListElement/ListElement";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {  fetchArticle, selectArticle, selectError, selectStatus } from '../../redux/store/articleSlice';
import { Spin,Alert } from "antd";



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

   return  <Spin size="large" />
 }

 if(status === 'rejected'){
   return   <Alert message="Error" description={error} type="error" showIcon />
 }

   return (
      <div>
         <ListElement {...article}></ListElement>
         <ReactMarkdown children={body}/>
      </div>
   )
}