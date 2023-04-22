import React, { useEffect } from "react";
import { Button } from "antd";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: 300,
          marginTop: 100,
        }}
      >
        Hellow World, my name is Dmitry Kroook! I am Full_Stack_Deweloper
        <Button
          onClick={() => router.push("/dashboard/auth")}
          style={{
            marginLeft: 10,
            background: "#f0eed2",
          }}
        >
          Войти в систему
        </Button>
      </h1>
    </>
  );
}
