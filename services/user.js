"use server";

import { fetchData } from "@/components/ssrTools";

const getUser = async (lang) => {
  let response = await fetchData({
    url: `user`,
    lang: lang,
    method: "GET",
  });

  return response;
};

export { getUser };
