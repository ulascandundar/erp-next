"use client";

import { Select } from "antd";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { getLanguageOptions } from "@/components/tools";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import ErpAnimation from "@/public/animation_erp.json";
import dynamic from "next/dynamic";

export default function AuthLayout({
  dict,
  lang,
  title,
  description,
  children,
  minHeight,
}) {
  const router = useRouter();
  const pathName = usePathname();
  const DynamicLottie = dynamic(
    () =>
      import("@lottiefiles/react-lottie-player").then(
        (module) => module.Player
      ),
    { ssr: false } // Sadece istemci tarafında yükle
  );
  const onChangeLangSwitcher = async (value) => {
    const saltPathName = pathName.slice(3);
    router.push(`/${value}${saltPathName}`);
  };

  const LangSwitcher = () => {
    const selectOptions = getLanguageOptions.map((option) => ({
      value: option.langCode,
      label: (
        <span className="flex items-center gap-2">
          {option.icon} {option.name}
        </span>
      ),
    }));
    return (
      <Select
        className="rounded-lg !border-0"
        style={{
          border: "1px solid #DCDCE4",
          background: "#84754e0f",
        }}
        defaultValue={lang}
        onChange={onChangeLangSwitcher}
        options={selectOptions}
      />
    );
  };

  return (
    <div className="flex h-screen flex-row">
      <div
        className="absolute inset-x-0 -z-10 w-full md:hidden"
        height={457}
        style={{
          width: "100%",
        }}
      />
      <div className="flex h-[calc(100%-7.25rem)] flex-1 flex-col items-center p-4 md:items-stretch">
        <div className="flex w-72 flex-row items-center p-0 pt-7 md:w-full md:justify-between lg:p-7">
          <Link href={`/${lang}/`}>
            <Image
              width={159}
              height={51}
              src={Logo}
              alt="logo"
              priority={"true"}
            />
          </Link>
          <div className="hidden md:block">
            <LangSwitcher />
          </div>
        </div>
        <div className="flex flex-auto flex-col items-center justify-center">
          <div className="w-72 md:w-80">
            <div className="mt-8 flex flex-row items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
              <div className="block md:hidden">
                <LangSwitcher />
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600 text-opacity-80 md:mt-2.5 md:text-left">
              <span dangerouslySetInnerHTML={{ __html: description }}></span>
            </p>
            {children}
          </div>
        </div>
      </div>
      <div
        className="relative hidden p-4 pl-2 md:flex md:w-1/2"
        style={{ minHeight: minHeight }}
      >
        <div className="h-full w-full rounded-2xl bg-blue-50 bg-opacity-50 object-cover"></div>
        <DynamicLottie
          className="fixed left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 transform object-contain opacity-55 brightness-75"
          autoplay
          loop
          src={ErpAnimation}
          style={{ width: 408 }}
        ></DynamicLottie>
      </div>
    </div>
  );
}
