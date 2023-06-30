import React from 'react';
import styles from './ListElement.module.scss';
import emptyHeart from './emptyHeart.svg';
import profileDefault from './profileDefault.svg';
import {  Tag } from 'antd';
export  const  ListElement = () =>{


   return (
      <div className={styles.element}>
         <div className={styles.wrap}>
         <div className={styles.title}>
            <h1 className={styles.header}>Some article title </h1>
            <img src={emptyHeart} className={styles.like} alt='non active like'/>
            <span className={styles.count}>12</span>
         </div>
         <div className={styles.profile}>
            <span className={styles.name}>Bob Lock</span>
            <span className={styles.date}>March 6. 2020</span>
            <img src={profileDefault} className={styles.defaultPicture} alt='default' />
         </div>
         </div>
         <div> 
            <Tag>Tag 1</Tag>
            <Tag>Tag 2</Tag>
         </div>
         
         <p>
Commodo velit proident sunt aliqua consectetur aliqua minim culpa. Labore velit anim nostrud consectetur eu deserunt. Tempor culpa     </p>
      </div>
   )
}