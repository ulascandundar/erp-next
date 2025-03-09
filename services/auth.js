"use server";

import { fetchData } from "@/components/ssrTools";
import { cookies } from "next/headers";

const postLogin = async (values, lang) => {
  let response = await fetchData({
    url: "auth/login",
    method: "POST",
    lang: lang,
    body: values,
  });
  const cookieStore = await cookies();
  cookieStore.set("token", response?.data?.token);

  return response;
};

const setLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.set("token", "");
  return true;
};

const postUsersChangePassword = async (values, lang) => {};

const postUsersForgotPassword = async (values, lang) => {};

const putForgotPasswordResetPassword = async (values, lang) => {};

export {
  postLogin,
  postUsersChangePassword,
  postUsersForgotPassword,
  putForgotPasswordResetPassword,
  setLogout,
};
