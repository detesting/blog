import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './ArticleForm.css';
import { createArticle, updateArticle } from '../../store/userSlice';

function ArticleForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = useSelector((state) => state.articles.url);

  const { pathname } = useLocation();
  const { slug } = useParams();
  let { article } = useSelector((state) => state.articles.article);

  if (pathname === '/new-article') {
    article = {};
  }

  const submitForm = ({ title, description, body, tagList }) => {
    const article = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    if (pathname === '/new-article') {
      dispatch(createArticle({ article, url })).then(({ meta }) => {
        if (meta.requestStatus === 'rejected') {
          message.error('Error create', 5);
        } else {
          message.success('Success create', 5);
          navigate('/');
        }
      });
    } else {
      dispatch(updateArticle({ article, url, slug })).then(({ meta }) => {
        if (meta.requestStatus === 'rejected') {
          message.error('Error update', 5);
        } else {
          message.success('Success update', 5);
          navigate('/');
        }
      });
    }
  };

  return localStorage.getItem('isLogin') ? (
    <div className="ArticleForm">
      <div className="article_form__title">{pathname === '/new-article' ? 'Create new article' : 'Edit article'}</div>
      <Form
        form={form}
        name="register_form"
        onFinish={submitForm}
        layout="vertical"
        className="sign_up__form"
        initialValues={{ ...article }}
      >
        <Form.Item
          label="Title"
          name="title"
          className="form__item"
          rules={[{ required: true, message: 'Enter title' }]}
        >
          <Input className="form__input" placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Short description"
          name="description"
          className="form__item"
          rules={[{ required: true, message: 'Enter short description' }]}
        >
          <Input className="form__input" placeholder="Short description" />
        </Form.Item>
        <Form.Item
          label="Text"
          name="body"
          className="form__item"
          rules={[{ required: true, message: 'Enter short description' }]}
        >
          <Input.TextArea className="form__input form__text_aria" placeholder="Text" rows={7} />
        </Form.Item>

        <Form.List name="tagList">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? 'Tags' : ''}
                  required={false}
                  key={field.key}
                  className="article_form__item"
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Enter tag',
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Tag" className="article_form__input" />
                  </Form.Item>
                  <Button type="primary" ghost danger className="delete_button" onClick={() => remove(field.name)}>
                    Delete
                  </Button>
                  {index === fields.length - 1 ? (
                    <Button type="primary" ghost onClick={() => add()} className="add_button">
                      Add tag
                    </Button>
                  ) : null}
                </Form.Item>
              ))}
              {fields.length === 0 ? (
                <Form.Item>
                  <Button type="primary" ghost onClick={() => add()} className="add_button add_button__null">
                    Add tag
                  </Button>
                </Form.Item>
              ) : null}
            </>
          )}
        </Form.List>

        <Form.Item className="form__submit" name="submit">
          <Button type="primary" htmlType="submit" className="send__button">
            Send
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

export default ArticleForm;
