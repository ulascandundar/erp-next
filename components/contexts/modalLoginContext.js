"use client";

import { createContext, useContext, useState } from "react";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { CloseOutlined } from "@ant-design/icons";
import LoginForm from "@/app/[lang]/auth/login/loginForm";

const ModalLoginContext = createContext();

export function useModalLogin() {
  return useContext(ModalLoginContext);
}

export function ModalLoginProvider({ children, dict, lang }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reloadByNewToken, setReloadByNewToken] = useState(false);
  const router = useRouter();
  const [ariaDisabled, setAriaDisabled] = useState(false);
  const onResponse = (response) => {
    if (response) {
      hideModal();
      reloadUserData();
      setReloadByNewToken(!reloadByNewToken);
    }
  };

  const showModal = () => {
    clearUserData();
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleLogOut = async () => {
    try {
      setAriaDisabled(true);
    } finally {
      router.push(`/${lang}/auth/login/?reload=true`);
    }
  };

  return (
    <ModalLoginContext.Provider
      value={{
        reloadByNewToken,
        showModal,
      }}
    >
      {children}
      <Modal
        className="customize-modal"
        open={isModalVisible}
        footer={null}
        closable={false}
        maskClosable={false}
        title={
          <div className="bg-azure flex min-h-12 justify-between gap-2">
            <h3 className="my-3 ms-4 flex flex-wrap items-center gap-4 leading-4">
              {dict.auth.loginSignTitle}
            </h3>
            <div
              className={`flex flex-wrap ${
                ariaDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={ariaDisabled ? undefined : handleLogOut}
              style={{ pointerEvents: ariaDisabled ? "none" : "auto" }}
            >
              <CloseOutlined className="px-4" />
            </div>
          </div>
        }
      >
        <div className="px-6 pb-4">
          <LoginForm
            dict={dict}
            lang={lang}
            response={true}
            onResponse={onResponse}
          />
        </div>
      </Modal>
    </ModalLoginContext.Provider>
  );
}
