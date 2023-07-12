import React from "react";
import styles from "./ListElement.module.scss";
import emptyHeart from "./emptyHeart.svg";
import fullHeart from './fullHeart.svg'
//import profileDefault from "./profileDefault.svg";
import {format} from "date-fns"
import { Tag } from "antd";
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { selectIsLogin } from '../../redux/store/userSlice';
import { favoriteArticle, unfavoriteArticle } from '../../redux/store/articleSlice';

export const ListElement = ({author, createdAt, description, tagList, favoritesCount,favorited, slug, title}) => {
console.log('favorited',favorited)
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);

  const sliceString = (str, num) => {
    if (str && str.length > num) {
      const newStr = `${str.slice(0, num)}...`;
      return newStr;
    }
    return str;
  };

  const tags = tagList?tagList.map((item)=>{

    return <Tag>{sliceString(item,10)}</Tag>
  }):null

  const onLike = () => {
    if (!isLogin) return;
    favorited ? dispatch(unfavoriteArticle(slug)) : dispatch(favoriteArticle(slug));
  };

  

  const createDate = format(new Date(createdAt),'MMMM dd, yyyy');
  return (
    <div className={styles.element}>
      <div className={styles.wrap}>
        <div className={styles.title}>
          <Link to={`/articles/${slug}`} className={styles.link}>{ sliceString(title,25)}</Link>
          
      {favorited ? (
        <img src={fullHeart} alt="like" className={styles.like} onClick={onLike} role="presentation" />
      ) : (
        <img src={emptyHeart} alt="not active like" className={styles.like} onClick={onLike} role="presentation" />
      )}
          
          <span className={styles.count}>{favoritesCount}</span>
        </div>
        <div className={styles.profile}>
          <span className={styles.name}>{sliceString(author.username,14)}</span>
          <span className={styles.date}>{createDate}</span>
          <img
            src={author.image}
            className={styles.picture}
            alt="default"
          />
        </div>
      </div>
      <div className={styles.tags}>
        {tags}
      </div>

      <p className={styles.text}>
        {description}
       {" "}
      </p>
    </div>
  );
};
