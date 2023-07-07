import React from "react";
import styles from "./ListElement.module.scss";
import emptyHeart from "./emptyHeart.svg";
//import profileDefault from "./profileDefault.svg";
import {format} from "date-fns"
import { Tag } from "antd";
import { Link } from 'react-router-dom';

export const ListElement = ({author, createdAt, description, tagList, favoritesCount, slug, title}) => {

  const tags = tagList?tagList.map((item)=>{

    return <Tag>{item}</Tag>
  }):null

  const createDate = format(new Date(createdAt),'MMMM dd, yyyy');
  return (
    <div className={styles.element}>
      <div className={styles.wrap}>
        <div className={styles.title}>
          <Link to={`/articles/${slug}`} className={styles.header}>{title} </Link>
          <img src={emptyHeart} className={styles.like} alt="non active like" />
          <span className={styles.count}>{favoritesCount}</span>
        </div>
        <div className={styles.profile}>
          <span className={styles.name}>{author.username}</span>
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
