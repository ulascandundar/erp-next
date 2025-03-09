"use client";

import { useUser } from "@/components/contexts/userContext";
import { IconBuildingOffice, IconCheckBadge } from "@/components/icons";
import { getDateFormat } from "@/components/tools";
import { DatePicker, Skeleton } from "antd";
import dayjs from "dayjs";

export default function DashboardPage({ dict, lang }) {
  const { user } = useUser();
  const todayDate = dayjs(new Date());

  return (
    <div className="flex flex-wrap items-center gap-5">
      {user?.name ? (
        <>
          <div className="ml-1 flex flex-1 flex-col justify-center">
            <div className="text-xl font-medium text-gray-900 md:text-3xl">
              {dict.dashboard.hello},{" "}
              <span className="inline-flex font-bold">
                {user?.name && (
                  <>
                    {`${user?.name}`}
                    <IconCheckBadge className={"h-4 w-4 text-green-500"} />
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold leading-4 text-gray-800">
              <IconBuildingOffice className={"h-6 w-6"} />
              <div>Company Name</div>
            </div>
          </div>
          <div className="basis-full self-center md:basis-48">
            <DatePicker
              className="w-full"
              format={getDateFormat[lang]}
              defaultValue={todayDate}
              disabledDate={(d) => !d || d.isAfter(todayDate)}
            />
          </div>
        </>
      ) : (
        <div className="flex h-16 w-full items-center gap-2">
          <Skeleton.Input active size={"large"} />
        </div>
      )}
    </div>
  );
}
