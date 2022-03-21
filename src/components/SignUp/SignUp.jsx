import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [form] = Form.useForm();
  return (
    <div className="SignUp">
      <div className="sign_up__title">Create new account</div>
      <Form
        form={form}
        name="register_form"
        onFinish={() => console.log('пора отправить данные')}
        layout="vertical"
        className="sign_up__form"
      >
        <Form.Item
          label="Username"
          name="username"
          className="form__item"
          rules={[{ required: true, message: 'Username must have 3-20 characters', min: 3, max: 20 }]}
        >
          <Input className="form__input" placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Email address"
          name="email-address"
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
              message: 'Your password needs to be at least 6 characters',
              min: 6,
              max: 40,
            },
          ]}
        >
          <Input.Password className="form__input" placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Repeat Password"
          name="repeat-password"
          className="form__item"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('Passwords must match'));
              },
            }),
          ]}
        >
          <Input.Password className="form__input" placeholder="Password" />
        </Form.Item>
        <Form.Item
          className="form__checkbox"
          name="remember"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          valuePropName="checked"
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item className="form__submit" name="submit">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Create
          </Button>
        </Form.Item>
        <Form.Item className="form__have_account" name="have_account">
          <div>
            Already have an account? <Link to="/sign-in">Sign In</Link>.
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUp;
