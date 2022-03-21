import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
//HeartFilled
import { HeartOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import './Article.css';

function Article({ article }) {
  const { author, updatedAt, favoritesCount, tagList, title, description, slug } = article;
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
                <HeartOutlined onClick={() => console.log('click Like')} className="likes" />
                <div className="likes__count">{favoritesCount}</div>
              </div>
            </div>
            <div className="article__tags">
              {tagList.map((tag) => (
                <Tag key={nanoid()} className="tag">{`${tag}`}</Tag>
              ))}
            </div>
          </div>
          <div className="article__body">{description}</div>
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
    </div>
  );
}

export default Article;
