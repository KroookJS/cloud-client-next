import { GetServerSidePropsContext, NextPage } from "next";
import { Layout } from "@/layout/Layout";
import React from "react";
import { checkAuth } from "@/utils/checkAuth";
import * as Api from "@/api";
import styles from "../../styles/Profile.module.scss";

import { User } from "@/api/dto/auth.dto";
import { Button } from "antd";

interface UserProps {
  userData: User;
}

const DashboardPage: NextPage<UserProps> = ({ userData }) => {
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти ?")) {
      Api.auth.logout();
      location.href = "/dashboard/auth";
    }
  };

  return (
    <main>
      <div className={styles.root}>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Полное имя: <b>{userData.fullname}</b>
        </p>
        <p>
          E-Mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button onClick={onClickLogout} type="primary" danger>
          Выйти
        </Button>
      </div>
    </main>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Trash / Корзина">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const userData = await Api.auth.authMe();

    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { userData: "" },
    };
  }
};

export default DashboardPage;
