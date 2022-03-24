import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';

import { editUser } from '../../store/userSlice';
import './EditProfile.css';

function EditProfile() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.articles.url);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const edit = ({ email, username, password, image }) => {
    const user = {
      user: {
        token: localStorage.getItem('token'),
        username,
        email,
        password,
        image,
      },
    };
    dispatch(editUser({ user, url })).then(({ meta }) => {
      if (meta.requestStatus === 'rejected') {
        message.error('Error edit. Please, change username or email', 5);
      } else {
        message.success('Success edit', 5);
        navigate('/');
      }
    });
  };

  return localStorage.getItem('isLogin') ? (
    <div className="SignUp">
      <div className="sign_up__title">Create new account</div>
      <Form form={form} name="register_form" onFinish={edit} layout="vertical" className="sign_up__form">
        <Form.Item
          label="Username"
          name="username"
          className="form__item"
          rules={[{ required: true, message: 'Enter your username' }]}
        >
          <Input className="form__input" placeholder="Username" />
        </Form.Item>
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
          label="New password"
          name="password"
          className="form__item"
          rules={[
            {
              required: true,
              message: 'Your password needs to be at least 6 characters',
              min: 6,
              max: 40,
            },
          ]}
        >
          <Input.Password className="form__input" placeholder="New password" />
        </Form.Item>
        <Form.Item
          label="Avatar image (url)"
          name="image"
          rules={[{ type: 'url', required: true, message: 'Enter URL image' }]}
        >
          <Input placeholder="Avatar image" />
        </Form.Item>
        <Form.Item className="form__submit" name="submit">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <div className="hacker">
      <Link to="/sign-in">Sign In</Link>, please!
    </div>
  );
}

export default EditProfile;
