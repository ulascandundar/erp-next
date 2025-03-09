"use client";
import { Avatar, Badge, Dropdown, Image, Skeleton } from "antd";
import { IconUser, IconLogout, IconCheck } from "@/components/icons";
import { setLogout } from "@/services/auth";
import { usePathname } from "next/navigation";
import { getLanguageOptions } from "@/components/tools";
import { useUser } from "@/components/contexts/userContext";
import { useState } from "react";
import Link from "next/link";

export default function SectionHeaderComponent({ title, dict, lang }) {
  const pathPrefix = `/${lang}/portal/`;
  const pathName = usePathname();
  const { user, profilePicture, clearUserData } = useUser();
  const [ariaDisabled, setAriaDisabled] = useState(false);

  // #region kullanıcıya özel menü seçicisi için sabit değişkenler
  const langItems = getLanguageOptions.map((option, index) => ({
    key: String(index + 2 + 1),
    icon: option.icon,
    label: (
      <Link
        href={`/${option.langCode}${pathName.slice(3)}`}
        scroll={false}
        className="flex items-center justify-between"
      >
        <span>{option.name}</span>
        <IconCheck
          className={`h-4 w-4 ${
            lang === option.langCode ? "visible" : "hidden"
          }`}
        />
      </Link>
    ),
  }));

  const userItems = [
    {
      key: "1",
      icon: <IconUser className={"h-6 w-6"} />,
      label: (
        <a href={`${pathPrefix}profile/change-password/`}>
          {dict.profile.title}
        </a>
      ),
    },
    {
      key: "2",
      icon: <IconLogout className={"h-6 w-6"} />,
      label: (
        <Link href={`/${lang}/auth/login/`} onClick={() => handleLogOut()}>
          {dict.auth.logout}
        </Link>
      ),
      disabled: ariaDisabled,
    },
    {
      type: "divider",
    },
  ].concat(langItems);
  // #endregion kullanıcıya özel menü seçicisi için sabit değişkenler

  const handleLogOut = async () => {
    try {
      setAriaDisabled(true);
      await setLogout(lang);
    } finally {
      clearUserData();
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white p-4 shadow-sm lg:flex lg:items-center">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 sm:truncate sm:tracking-tight">
          {title}
        </h1>
        <div className="hidden items-center gap-4 divide-x divide-gray-100 lg:flex">
          <Dropdown
            menu={{
              items: userItems,
            }}
            placement="bottom"
          >
            <div className="flex cursor-pointer items-center gap-3 pl-4">
              {user?.name ? (
                <>
                  <Badge dot color="green" offset={[-2, 26]}>
                    <Avatar
                      className={`!flex !h-8 !w-8 items-center justify-center rounded-full !border-0 !text-white ${
                        profilePicture ? "!bg-white" : "!bg-gray-300"
                      }`}
                      icon={
                        profilePicture ? (
                          <Image
                            src={profilePicture}
                            alt="profilePicture"
                            width={32}
                            height={32}
                            className="rounded-full"
                            preview={false}
                          />
                        ) : (
                          <IconUser className={"h-6 w-6"} />
                        )
                      }
                    />
                  </Badge>
                  <div className="flex select-none flex-col justify-center">
                    <div className="text-left text-xs font-bold text-gray-900">
                      {`${
                        user?.name
                          ? user?.name?.length > 18
                            ? user?.name?.slice(0, 18) + "..."
                            : user?.name
                          : ""
                      }`}
                    </div>
                    <div className="text-left text-xs font-medium text-gray-700">
                      {`${
                        dict.dashboard.emaaAgency?.length > 18
                          ? dict.dashboard.emaaAgency.slice(0, 18) + "..."
                          : dict.dashboard.emaaAgency
                      }`}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex gap-2">
                  <Skeleton.Avatar active size={"small"} shape={"circle"} />
                  <Skeleton.Input active size={"small"} />
                </div>
              )}
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
