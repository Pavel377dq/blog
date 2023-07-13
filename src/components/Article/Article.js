/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Alert, Popconfirm, Button } from 'antd';

import  ListElement  from '../ListElement/ListElement';
import { fetchArticle, selectArticle, selectError, selectStatus, deleteArticle } from '../../redux/store/articleSlice';
import { selectUser } from '../../redux/store/userSlice';

import styles from './Article.module.scss';

 function Article() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const dispatch = useDispatch();
    const article = useSelector(selectArticle);
    const error = useSelector(selectError);
    const status = useSelector(selectStatus);

    const currentUser = useSelector(selectUser);
    const { body, author } = article;

    useEffect(() => {
        if (slug) {
            dispatch(fetchArticle(slug));
        }
    }, [slug]);

    const onDelete = () => {
        dispatch(deleteArticle({ slug: article.slug, navigate }));
    };
    const onEdit = () => {
        navigate(`/articles/${slug}/edit`);
    };

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

    return (
        <div className={styles.wrap}>
            <ListElement item = {article} />
            <ReactMarkdown className={styles.markdown} children={body} />
            {author.username === currentUser.username && (
                <>
                    {error?.delete && (
                        <Alert
                            className={styles.serverError}
                            message="Deletion error. Try again"
                            type="error"
                            showIcon
                        />
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
    );
}

export default Article;