"use server";

import { fetchData } from "@/components/ssrTools";

const getProduct = async (lang) => {
  let response = await fetchData({
    url: `product`,
    lang: lang,
    method: "GET",
  });

  return response;
};

const postProduct = async (values, lang) => {
  let response = await fetchData({
    url: `product`,
    method: "POST",
    lang: lang,
    body: values,
  });

  return response;
};

const getProductById = async (lang, id) => {
  let response = await fetchData({
    url: `product/${id}`,
    method: "GET",
    lang: lang,
  });

  return response;
};

const deleteProductById = async (lang, id) => {
  let response = await fetchData({
    url: `product/${id}`,
    method: "DELETE",
    lang: lang,
  });

  return response;
};

const putProductById = async (values, lang) => {
  let response = await fetchData({
    url: `product/${values?.id}`,
    method: "PUT",
    lang: lang,
    body: values,
  });

  return response;
};

export {
  getProduct,
  postProduct,
  getProductById,
  deleteProductById,
  putProductById,
};
