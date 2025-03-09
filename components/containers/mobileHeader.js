"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IconMenu } from "@/components/icons";

export default function MobileHeaderComponent() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const classNameIsOpen = isOpen ? "visible opacity-40" : "invisible opacity-0";

  const asideIsOpen = (val) => {
    setIsOpen(val);
    if (val) {
      document.body.classList.add("self-overflow-hidden");
      document.getElementById("sideBar").classList.add("!translate-none");
    } else {
      document.body.classList.remove("self-overflow-hidden");
      document.getElementById("sideBar").classList.remove("!translate-none");
    }
  };

  useEffect(() => {
    asideIsOpen(false);
  }, [pathName]);

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-gray-900 transition-opacity duration-300 ease-in-out lg:hidden ${classNameIsOpen}`}
        onClick={() => asideIsOpen(false)}
      />
      <div className="fixed right-2 top-2 z-30 flex h-12 items-center justify-between lg:hidden">
        <button
          type="button"
          className="block p-2.5 text-gray-700 hover:text-gray-500"
          onClick={() => asideIsOpen(!isOpen)}
        >
          <IconMenu className={"h-6 w-6"} />
        </button>
      </div>
    </>
  );
}
