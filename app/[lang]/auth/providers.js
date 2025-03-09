"use client";

import { ConfigProvider } from "antd";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useMemo, useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function ThemeProviders({ children, fontFamily }) {
  const cache = useMemo(() => createCache(), []);
  const isServerInserted = useRef(false);
  useServerInsertedHTML(() => {
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;
    return (
      <style
        id="auth"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });

  return (
    <StyleProvider hashPriority="high" cache={cache}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: fontFamily,
            colorPrimary: "#3498DB",
            colorBgBase: "#F0F0F0",
            colorBorder: "#D1D1D1",
            controlHeight: 46,
            borderRadius: 8,
          },
          components: {
            Button: {
              fontWeight: 700,
              lineHeight: 1.25,
              fontSize: 16,
              controlHeight: 46,
              controlOutlineWidth: 0,
              controlOutline: 0,
            },
            Input: {
              controlOutlineWidth: 0,
              controlOutline: 0,
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
