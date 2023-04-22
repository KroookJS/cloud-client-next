import { GetServerSidePropsContext, NextPage } from "next";
import { Layout } from "@/layout/Layout";
import React from "react";
import { checkAuth } from "@/utils/checkAuth";
import * as Api from "@/api";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layout/DashboardLayout";
import Files from "@/modules/Files";

interface ItemProps {
  items: FileItem[];
}

const DashboardPage: NextPage<ItemProps> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withAction  />
    </DashboardLayout>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Главная">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll();

    return {
      props: {
        items,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { items: [] },
    };
  }
};

export default DashboardPage;
