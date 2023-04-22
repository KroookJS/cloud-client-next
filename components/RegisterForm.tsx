import React from "react";
import style from "./Auth.module.scss";
import { Button, Form, Input, notification } from "antd";
import { RegisterFormDto } from "@/api/dto/auth.dto";
import { setCookie } from "nookies";

import * as Api from "@/api";

export const RegisterForm = () => {

  const onSubmit = async (value: RegisterFormDto) => {
     try {
        const data = await Api.auth.register(value)
        notification.success({
          message: "Успешно!",
          description: `Добро пожалуйста ${value?.fullName && 'новый пользователь'}`,
          duration: 2,
        })

        setCookie(null, "_token", data.token, {
          path: '/'
      })
      location.href = "/dashboard";
     } catch (error) {
      notification.error({
        message: "Ошибка!",
        description: "Ожибка при регистрации...",
        duration: 2,
      })
     }
  }
 
  return <div className={style.formBlock}>
       <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="FullName"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Укажите полное имя",
            },
          ]}
        >
        
        <Input />
        </Form.Item>
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
            Зарегистрироваться
          </Button>
        </Form.Item>
        </Form>
  </div>;
};
