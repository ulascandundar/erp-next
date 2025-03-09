"use client";

import { ConfigProvider } from "antd";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useMemo, useRef } from "react";
import { usePathname, useServerInsertedHTML } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { getLocale } from "@/components/tools";

export function ThemeProviders({ children, fontFamily, lang }) {
  const cache = useMemo(() => createCache(), []);
  const isServerInserted = useRef(false);
  const pathname = usePathname();
  const language = pathname.split("/")[1];
  useServerInsertedHTML(() => {
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;
    return (
      <style
        id="erp-next"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });

  return (
    <StyleProvider hashPriority="high" cache={cache}>
      <ConfigProvider
        locale={getLocale[lang]}
        theme={{
          token: {
            fontFamily: fontFamily,
            colorPrimary: "#3498DB",
            controlHeight: 40,
            borderRadius: 8,
          },
          components: {
            Button: {
              fontWeight: 600,
              lineHeight: 1.25,
              controlOutlineWidth: 0,
              controlOutline: 0,
            },
            Input: {
              controlOutlineWidth: 0,
              controlOutline: 0,
            },
            Select: {
              controlOutlineWidth: 0,
              controlOutline: 0,
            },
            Calendar: {
              fullBg: "#ffffff",
            },
            Tooltip: {
              lineHeight: "28px",
            },
          },
        }}
      >
        {children}
        <ProgressBar
          height="2px"
          color="#3498DB"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </ConfigProvider>
    </StyleProvider>
  );
}
