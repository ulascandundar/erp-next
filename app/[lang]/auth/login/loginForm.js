"use client";

import { Form, Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPasswordPattern } from "@/components/tools";
import AuthLayout from "@/components/containers/authLayout";
import Link from "next/link";
import { postLogin } from "@/services/auth";

export default function LoginForm({
  dict,
  lang,
  response,
  onResponse,
  searchParams,
}) {
  const [form] = Form.useForm();
  const [loadingAction, setLoadingAction] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("user");
  }, [lang]);

  useEffect(() => {
    if (searchParams?.reload) {
      router.push(`/${lang}/auth/login/`);
    }
  }, [lang, router, searchParams]);

  const showMessage = (type, message) => {
    messageApi.open({
      type: type,
      content: message,
    });
  };

  const isError = (message) => {
    setLoadingAction(false);
    showMessage("error", message);
  };

  const isSuccess = () => {
    showMessage("success", dict.public.success);
  };

  const onFinish = async (values) => {
    try {
      setLoadingAction(true);
      const res = await postLogin(values, lang);
      if (!res?.isSuccess) {
        isError(res?.message);
        if (response) onResponse(false);
      } else {
        isSuccess();
        const base64Token = res?.data.token.split(".")[1];
        const decodedToken = base64Token
          ? JSON.parse(
              Buffer.from(
                base64Token.replace("-", "+").replace("_", "/"),
                "base64"
              ).toString("utf-8")
            )
          : null;
        const user = {
          name: decodedToken?.name || "Artuhan Aslankaya",
          email: decodedToken?.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        if (response) {
          setLoadingAction(false);
          onResponse(true);
        } else router.push(`/${lang}/portal/`);
      }
    } catch (error) {
      if (error?.message != undefined) isError(error?.message);
      setLoadingAction(false);
    } finally {
      setLoadingAction(false);
    }
  };

  const LoginForm = () => {
    return (
      <Form form={form} onFinish={onFinish} layout="vertical" className="!mt-6">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: `${dict.public.requiredField}`,
            },
          ]}
        >
          <Input autoFocus placeholder={dict.public.email} />
        </Form.Item>
        <Form.Item
          name="password"
          // rules={[
          //   {
          //     required: true,
          //     pattern: getPasswordPattern,
          //     message: `${dict.public.passwordPattern}`,
          //   },
          // ]}
        >
          <Input.Password placeholder={dict.public.password} />
        </Form.Item>
        <Form.Item className="!mb-0">
          <Button
            data-testid="buttonSubmit"
            type="primary"
            className="w-full"
            htmlType="submit"
            loading={loadingAction}
          >
            {dict.public.login}
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      {contextHolder}
      {!response ? (
        <AuthLayout
          dict={dict}
          lang={lang}
          title={dict.auth.loginSignTitle}
          description={dict.auth.loginSignTitleDesc}
          minHeight={"659px"}
        >
          <LoginForm />
          <Link
            data-testid="linkForgotPassword"
            href={`/${lang}/auth/forgot-password/`}
            className="my-6 block text-center text-sm font-bold text-primary-color"
          >
            {dict.auth.forgotPasswordTitle}
          </Link>
        </AuthLayout>
      ) : (
        <LoginForm />
      )}
    </>
  );
}
