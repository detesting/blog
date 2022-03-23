import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../store/userSlice';
import './SignIn.css';
import '../SignUp/SignUp.css';

function SignIn() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const url = useSelector((state) => state.articles.url);

  const navigate = useNavigate();

  const loginIn = ({ email, password }) => {
    const user = {
      user: {
        email,
        password,
      },
    };
    dispatch(loginUser({ user, url })).then(({ meta }) => {
      if (meta.requestStatus === 'rejected') {
        message.error('Invalid data', 15);
      } else {
        navigate('/');
      }
    });
  };
  return (
    <div className="SignUp">
      <div className="sign_up__title">Sign In</div>
      <Form form={form} name="login_form" onFinish={loginIn} layout="vertical" className="sign_up__form">
        <Form.Item
          label="Email address"
          name="email"
          className="form__item"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input className="form__input" placeholder="Email address" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          className="form__item"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password className="form__input" placeholder="Password" />
        </Form.Item>
        <Form.Item className="form__submit" name="submit">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
        </Form.Item>
        <Form.Item className="form__have_account" name="have_account">
          <div>
            Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignIn;
