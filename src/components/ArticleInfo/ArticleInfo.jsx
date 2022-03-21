import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getArticle, clearArticle } from '../../store/articlesSlice';
import Article from '../Article';
import Loading from '../Loading';
import './ArticleInfo.css';

function ArticleInfo() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const url = useSelector((state) => state.articles.url);
  useEffect(() => {
    dispatch(getArticle({ url, slug }));
  }, [dispatch, url, slug]);
  const { article } = useSelector((state) => state.articles.article);
  const loading = useSelector((state) => state.articles.loading);

  const clearData = () => dispatch(clearArticle);

  clearData();

  return article ? (
    loading ? (
      <Loading />
    ) : (
      <div className="ArticleInfo">
        <div className="article__header">
          <Article article={article} />
        </div>
        <div className="article__main">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      </div>
    )
  ) : null;
}

export default ArticleInfo;
