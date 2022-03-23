import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserInfo, loginOut } from '../../store/userSlice';
import './Header.css';

function Header() {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.user.isLogin);

  let { pathname } = useLocation();
  console.log(pathname);
  const url = useSelector((state) => state.articles.url);
  useEffect(() => {
    dispatch(getUserInfo({ url }));
  }, [pathname]);

  const userInfo = useSelector((state) => state.user.userInfo);
  const defaultImg = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  console.log(userInfo);

  return (
    <div className="Header">
      <Link to="/" className="header__title">
        Realworld Blog
      </Link>
      {isLogin ? (
        <div>
          <Link to="/new-article" className="link_create">
            <button className="btn_create">Create article</button>
          </Link>
          <Link to="/profile" className="link_user">
            <span>{userInfo.username}</span>
          </Link>
          <Link to="/profile" className="link_img">
            <img
              src={userInfo.image ? userInfo.image : defaultImg}
              alt={userInfo.username}
              className="article__user_logo"
            />
          </Link>
          <Link to="/" className="link_log_out" onClick={() => dispatch(loginOut())}>
            <button className="btn_log_out">Log out</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/sign-in" className="link_sign_in">
            Sign In
          </Link>
          <Link to="/sign-up" className="link_sign_up">
            <button className="btn_sign_up">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
