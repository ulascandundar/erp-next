"use server";

import { getDictionary } from "@/dictionaries";
import LoginForm from "./loginForm";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: `${dict.auth.loginSignTitle} | ${dict.public.title}`,
  };
}
export default async function Login({ params, searchParams }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const awaitedSearchParams = await searchParams;

  return (
    <LoginForm
      dict={dict}
      lang={lang}
      response={false}
      searchParams={awaitedSearchParams}
    />
  );
}
