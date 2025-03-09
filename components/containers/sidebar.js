"use client";
import { usePathname } from "next/navigation";
import {
  IconCheck,
  IconUser,
  IconChartPie,
  IconArrowDown,
  IconChevronRight,
  IconPackage,
  IconCart,
} from "@/components/icons";
import { hasPermission } from "@/components/roleBasedMenus";
import { useState } from "react";
import { setLogout } from "@/services/auth";
import { getLanguageOptions } from "@/components/tools";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import MobileHeaderComponent from "@/components/containers/mobileHeader";
import Logo from "@/public/logo.png";

export default function SideBarContainer({ dict, lang, roles }) {
  const pathName = usePathname();
  const [isOpenUserTab, setIsOpenUserTab] = useState(() => {
    return pathName.includes("profile");
  });
  const [ariaDisabled, setAriaDisabled] = useState(false);
  const classIsActive = "!text-white !font-medium !bg-primary";
  const classIsActiveForButton =
    "!text-white !font-medium !bg-primary !text-base";
  const classIsNotActive = "!text-gray-600";
  const classIsNotActiveForButton =
    "!text-gray-600 !bg-white !text-base !font-medium";
  const pathPrefix = `/${lang}/portal/`;
  const classNameIsOpenUserTab = isOpenUserTab ? "block" : "hidden";

  const handleLogOut = async () => {
    try {
      setAriaDisabled(true);
      await setLogout(lang);
    } finally {
      clearUserData();
    }
  };

  const MenuLink = ({
    baseHref,
    subLink,
    isPermission = false,
    text,
    icon,
  }) => {
    isPermission = isPermission || hasPermission(baseHref + subLink, roles);
    const fullUrl = `${pathPrefix}${baseHref}${subLink}`;
    return (
      <li className={` ${isPermission ? "" : "hidden"}`}>
        <Link
          href={fullUrl}
          className={`flex items-center rounded-lg p-2 transition duration-200 hover:bg-gray-100 ${
            (baseHref && pathName.includes(baseHref)) || pathName == fullUrl
              ? classIsActive
              : classIsNotActive
          }`}
        >
          {icon}
          <span className="ml-3 flex-1 whitespace-nowrap text-left">
            {text}
          </span>
          <IconChevronRight
            className={`h-6 w-6 ${
              (baseHref && pathName.includes(baseHref)) || pathName == fullUrl
                ? "block"
                : "hidden"
            }`}
          />
        </Link>
      </li>
    );
  };

  return (
    <>
      <MobileHeaderComponent />
      <aside
        id="sideBar"
        className="fixed left-0 top-0 z-40 h-screen w-72 -translate-x-full transition-transform lg:translate-x-0"
      >
        <div className="flex h-full flex-col overflow-y-auto border-r border-r-gray-200 bg-white px-3 py-4">
          <div className="flex h-20 items-center justify-center">
            <Link href={pathPrefix} className="-ml-4">
              <Image
                width={159}
                height={51}
                src={Logo}
                alt="logo"
                priority={"true"}
              />
            </Link>
          </div>
          <div className="select-none text-center text-xs text-gray-400">
            {dict.public.title}
          </div>

          <ul className="mt-6 grow space-y-2">
            <MenuLink
              baseHref={""}
              subLink={""}
              isPermission={true}
              text={dict.dashboard.title}
              icon={<IconChartPie className="h-6 w-6" />}
            />
            <MenuLink
              baseHref={"product/"}
              subLink={""}
              text={dict.product.title}
              icon={<IconPackage className="h-6 w-6" />}
            />
            <MenuLink
              baseHref={"order/"}
              subLink={""}
              text={dict.order.title}
              icon={<IconCart className="h-6 w-6" />}
            />
          </ul>

          {/* #region Mobil ekranda en altta çıkar üstte gizlenen menülerin karşılığı olarak düşünün */}
          <ul className="space-y-2 font-medium lg:hidden">
            <li>
              <ul
                className={`space-y-2 py-2 transition delay-300 duration-1000 ${classNameIsOpenUserTab}`}
              >
                {getLanguageOptions.map((option) => (
                  <li key={option.langCode}>
                    <Link
                      href={`/${option.langCode}${pathName.slice(3)}`}
                      scroll={false}
                      className={`group flex w-full items-center rounded-lg p-2 transition duration-200 hover:bg-gray-100 ${
                        lang === option.langCode
                          ? classIsActive
                          : classIsNotActive
                      }`}
                    >
                      <IconCheck
                        className={`h-4 w-4 ${
                          lang === option.langCode ? "visible" : "hidden"
                        }`}
                      />
                      <span
                        className={`flex-1 whitespace-nowrap text-left ${
                          lang === option.langCode ? "ml-5" : "ml-9"
                        }`}
                      >
                        {option.name}
                      </span>
                    </Link>
                  </li>
                ))}
                <li
                  className={`${
                    hasPermission("profile/", roles) ? "" : "hidden"
                  }`}
                >
                  <Button
                    href={`/${lang}/portal/profile/change-password/`}
                    type="default"
                    className={`group !flex w-full !justify-start rounded-lg !border-0 !p-2 !pl-11 transition duration-200 hover:!bg-gray-100 ${
                      pathName.includes(`${pathPrefix}profile/`)
                        ? classIsActiveForButton
                        : classIsNotActiveForButton
                    }`}
                  >
                    {dict.profile.title}
                  </Button>
                </li>
                <li>
                  <Link
                    href={`/${lang}/auth/login/`}
                    onClick={() => handleLogOut()}
                    className={`group flex w-full items-center rounded-lg p-2 pl-11 text-gray-600 transition duration-200 hover:bg-gray-100 ${
                      ariaDisabled
                        ? "pointer-events-none text-gray-200"
                        : "cursor-pointer"
                    }`}
                  >
                    {dict.auth.logout}
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className={`group flex w-full items-center rounded-lg p-2 transition duration-200 hover:bg-gray-100 ${
                  isOpenUserTab ? classIsActive : classIsNotActive
                }`}
                onClick={() => setIsOpenUserTab(!isOpenUserTab)}
              >
                <IconUser className={"h-6 w-6"} />
                <span className="ml-3 flex-1 whitespace-nowrap text-left">
                  {dict.auth.userInformation}
                </span>
                <IconArrowDown
                  className={`h-6 w-6 ${isOpenUserTab ? "" : "rotate-180"}`}
                />
              </button>
            </li>
          </ul>
          {/* #endregion Mobil ekranda en altta çıkar üstte gizlenen menülerin karşılığı olarak düşünün */}
        </div>
      </aside>
    </>
  );
}
