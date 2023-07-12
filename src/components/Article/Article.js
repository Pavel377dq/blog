import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React from "react";
import { ListElement } from "../ListElement/ListElement";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {  fetchArticle, selectArticle, selectError, selectStatus,deleteArticle } from '../../redux/store/articleSlice';
import { Spin,Alert, Popconfirm,Button } from "antd";
import styles from './Article.module.scss';
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/store/userSlice";

export const Article = () =>{
   const navigate = useNavigate();
   const { slug } = useParams();
   const dispatch = useDispatch();
   const article = useSelector(selectArticle);
   const error = useSelector(selectError);
   const status = useSelector(selectStatus);

   const currentUser = useSelector(selectUser);
   const { body, author } = article;

   useEffect(()=>{
      if(slug){
         dispatch(fetchArticle(slug));
      }
   },[slug]);

   const onDelete = () => {
      dispatch(deleteArticle({ slug: article.slug, navigate }));
    };
    const onEdit = () => {
      navigate(`/articles/${slug}/edit`);
    };
  
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
         {author.username === currentUser.username && (
        <>
          {error?.delete && (
            <Alert className={styles.serverError} message="Deletion error. Try again" type="error" showIcon />
          )}
          <div className={styles.buttonWrap}>
            <Popconfirm
              placement="leftTop"
              title="Deleting the article"
              description="Are you sure to delete this article?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button className={styles.buttonDelete}>Delete</Button>
            </Popconfirm>
            <Button className={styles.buttonEdit} onClick={onEdit}>
              Edit
            </Button>
          </div>
        </>
      )}
      </div>
   )
}