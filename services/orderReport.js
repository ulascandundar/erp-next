"use server";

import { fetchData } from "@/components/ssrTools";

const getOrderReport = async (lang) => {
  let response = await fetchData({
    url: `orderReport`,
    lang: lang,
    method: "GET",
  });

  return response;
};

export { getOrderReport };
