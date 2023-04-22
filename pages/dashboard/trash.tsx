import { GetServerSidePropsContext, NextPage } from "next";
import { Layout } from "@/layout/Layout";
import React from "react";
import { checkAuth } from "@/utils/checkAuth";
import * as Api from "@/api";
import { FileList } from "@/components/FileList";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layout/DashboardLayout";

interface ItemProps {
  items: FileItem[];
}

const DashboardPage: NextPage<ItemProps> = ({ items }) => {
  return (
    <DashboardLayout>
      <FileList items={items} />
    </DashboardLayout>
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
    const items = await Api.files.getAll('trash');

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
