/* eslint-disable arrow-body-style */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { loadArticles, setPage } from "../../redux/actions";
import { Pagination, Spin, Alert } from 'antd';

import  ListElement  from '../ListElement/ListElement';
import {
    fetchArticles,
    selectAllArticles,
    selectCurrentPage,
    setCurrentPage,
    selectStatus,
    selectError,
} from '../../redux/store/articleListSlice';
import { selectIsLogin } from '../../redux/store/userSlice';

import styles from './List.module.scss';

 function List() {
    const articles = useSelector(selectAllArticles);
    const page = useSelector(selectCurrentPage);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    const isLogin = useSelector(selectIsLogin);

    useEffect(() => {
        dispatch(fetchArticles(page));
    }, [page, isLogin]);

    if (status === 'pending') {
        return (
            <div className={styles.spin}>
                <Spin size="large" />
            </div>
        );
    }

    if (status === 'rejected') {
        return <Alert message="Error" description={error} type="error" showIcon />;
    }

    const handlerOnChangePage = (currentPage) => {
        dispatch(setCurrentPage(currentPage));

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };


    const list = articles
        ? articles.map((item) => {
              return (
                  <div className={styles.element} key={item.slug}>
                      <ListElement item ={item} />
                  </div>
              );
          })
        : null;
        
    return (
        <div className={styles.list}>
            {list}
            <Pagination
                className={styles.pagination}
                current={page}
                onChange={handlerOnChangePage}
                defaultPageSize={20}
                showSizeChanger={false}
                total={1000}
            />
        </div>
    );
}

export default List;