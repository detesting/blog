import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Pagination } from 'antd';

import { getArticles, changePage } from '../../store/articlesSlice';
import Loading from '../Loading';
import Article from '../Article';
import './ListArticles.css';

function ListArticles() {
  const dispatch = useDispatch();

  const offset = useSelector((state) => state.articles.offset);
  const limit = useSelector((state) => state.articles.limit);
  const url = useSelector((state) => state.articles.url);

  const currentPage = useSelector((state) => state.articles.page);

  useEffect(() => dispatch(getArticles({ limit, offset, url })), [currentPage]);

  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const articles = useSelector((state) => state.articles.articleArr);

  const loading = useSelector((state) => state.articles.loading);

  return (
    <div className="ListArticles">
      {loading ? (
        <Loading />
      ) : (
        <div className="articles_list">
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={articles}
            renderItem={(article) => (
              <List.Item>
                <div className="article__item">
                  <Article article={article} />
                </div>
              </List.Item>
            )}
          />
          <Pagination
            defaultCurrent={1}
            total={articlesCount - 1}
            pageSize={5}
            showSizeChanger={false}
            className="pagination"
            current={currentPage}
            onChange={(page) => dispatch(changePage({ page }))}
            size="small"
          />
        </div>
      )}
    </div>
  );
}

export default ListArticles;
