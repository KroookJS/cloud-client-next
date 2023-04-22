import React, { useEffect } from "react";
import style from "./Auth.module.scss";
import { Button, Form, Input, notification } from "antd";
import { LoginFormDto } from "@/api/dto/auth.dto";

import * as Api from "@/api";
import { setCookie } from "nookies";

export const LoginForm = () => {
  const onSubmit = async (value: LoginFormDto) => {
    try {
      const { token } = await Api.auth.login(value);

      notification.success({
        message: "Успешно!",
        description: "Переходим в админ-панель...",
        duration: 2,
      });
      setCookie(null, "_token", token, {
        path: "/",
      });

      location.href = "/dashboard";
    } catch (error) {
      notification.error({
        message: "Ошибка!",
        description: "Не верный логин или пароль...",
        duration: 2,
      });
    }
  };

  return (
    <div className={style.formBlock}>
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Укажите почту",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Укажите pssword",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
