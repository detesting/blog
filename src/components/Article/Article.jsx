import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button, Popconfirm, Tag, message } from 'antd';

import { deleteArticle, deleteFavorite, addFavorite } from '../../store/userSlice';
import './Article.css';

function Article({ article }) {
  const { author, updatedAt, favoritesCount, tagList, title, description, slug, favorited } = article;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const dispatch = useDispatch();
  const url = useSelector((state) => state.articles.url);

  const [countFavorites, setCountFavorites] = useState(favoritesCount);
  const [favorites, setFavorites] = useState(favorited);

  let { pathname } = useLocation();
  const navigate = useNavigate();

  const onDelete = () => {
    if (userInfo.username === article.author.username) {
      dispatch(deleteArticle({ url, slug })).then(({ meta }) => {
        if (meta.requestStatus === 'rejected') {
          message.error('Error delete', 5);
        } else {
          message.success('Success delete', 5);
          navigate('/articles');
        }
      });
    } else {
      message.error('You are not ' + article.author.username, 5);
    }
  };

  const onEdit = () => {
    if (userInfo.username === article.author.username) {
      navigate(`/articles/${slug}/edit`);
    } else {
      message.error('You are not ' + article.author.username, 5);
    }
  };

  const onFavorite = () => {
    dispatch(addFavorite({ url, slug })).then(({ meta, payload }) => {
      if (meta.requestStatus === 'rejected') {
        message.error('Error favorite', 5);
      } else {
        const { article } = payload;
        const { favoritesCount, favorited } = article;
        setCountFavorites(favoritesCount);
        setFavorites(favorited);
      }
    });
  };

  const onFavoriteDelete = () => {
    dispatch(deleteFavorite({ url, slug })).then(({ meta, payload }) => {
      if (meta.requestStatus === 'rejected') {
        message.error('Error delete favorite', 5);
      } else {
        const { article } = payload;
        const { favoritesCount, favorited } = article;
        setCountFavorites(favoritesCount);
        setFavorites(favorited);
      }
    });
  };

  return (
    <div className="Article">
      <div className="general">
        <div className="Article__left">
          <div className="header">
            <div className="header__general">
              <div className="article__title">
                <Link to={`/articles/${slug}`}>{title}</Link>
              </div>
              <div className="article__likes">
                {favorites ? (
                  <HeartFilled className="likes" onClick={onFavoriteDelete} style={{ color: 'red' }} />
                ) : (
                  <HeartOutlined onClick={onFavorite} className="likes" />
                )}
                <div className="likes__count">{countFavorites}</div>
              </div>
            </div>
            <div className="article__tags">
              {tagList.map((tag) => (
                <Tag key={nanoid()} className="tag">{`${tag}`}</Tag>
              ))}
            </div>
          </div>
        </div>
        <div className="Article__right">
          <div className="article__user">
            <div className="article__name_user">{author.username}</div>
            <div className="article__date">{format(new Date(updatedAt), 'PPP')}</div>
          </div>
          <div>
            <img src={author.image} alt={author.username} className="article__user_logo" />
          </div>
        </div>
      </div>
      {localStorage.getItem('isLogin') && pathname === `/articles/${slug}` ? (
        <div className="article__desc_btns">
          <div className="article__body">{description}</div>
          <div className="article__buttons">
            <Popconfirm
              placement="rightTop"
              title="Are you sure to delete this article?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button className="article__delete">Delete</Button>
            </Popconfirm>
            <Button className="article__edit" onClick={onEdit}>
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <div className="article__body">{description}</div>
      )}
    </div>
  );
}

export default Article;
