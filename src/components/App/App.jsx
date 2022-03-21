import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Header from '../Header';
import ListArticles from '../ListArticles';
import ArticleInfo from '../ArticleInfo';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import EditProfile from '../EditProfile';
import ArticleForm from '../ArticleForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ListArticles />} />
        <Route path="/articles" element={<ListArticles />} />
        <Route path="/articles/:slug" element={<ArticleInfo />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/new-article" element={<ArticleForm />} />
        <Route path="/articles/:slug/edit" element={<ArticleForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
