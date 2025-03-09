"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import LoginForm from "@/app/[lang]/auth/login/loginForm";

export default function ModalLogin({ dict, lang, open, onOk }) {
  const router = useRouter();

  const onResponse = (val) => {
    if (val) onOk();
  };

  return (
    <Modal
      open={open}
      footer={null}
      title={null}
      onCancel={async () => {
       router.push(`/${lang}/auth/login/`);
      }}
    >
      <LoginForm
        dict={dict}
        lang={lang}
        response={true}
        onResponse={onResponse}
      />
    </Modal>
  );
}

export const validResponse = (val) => {
  if (val?.isSuccess == false && val?.message.includes("401 - Unauthorized")) {
    return false;
  } else {
    return true;
  }
};
