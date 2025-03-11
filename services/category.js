"use server";

import { fetchData } from "@/components/ssrTools";

const getCategory = async (lang) => {
  let response = await fetchData({
    url: `category`,
    method: "GET",
    lang: lang,
  });

  return response;
};

const postCategory = async (values, lang) => {
  let response = await fetchData({
    url: `category`,
    method: "POST",
    lang: lang,
    body: values,
  });

  return response;
};

const getCategoryById = async (lang, id) => {
  let response = await fetchData({
    url: `category/${id}`,
    method: "GET",
    lang: lang,
  });

  return response;
};

const deleteCategoryById = async (lang, id) => {
  let response = await fetchData({
    url: `category/${id}`,
    method: "DELETE",
    lang: lang,
  });

  return response;
};

const putCategoryById = async (values, lang) => {
  let response = await fetchData({
    url: `category/${values?.id}`,
    method: "PUT",
    lang: lang,
    body: values,
  });

  return response;
};

const getCategoryByIdWithProducts = async (lang, id) => {
  let response = await fetchData({
    url: `category/${id}/withProducts`,
    method: "GET",
    lang: lang,
  });

  return response;
};

export {
  getCategory,
  postCategory,
  getCategoryById,
  deleteCategoryById,
  putCategoryById,
  getCategoryByIdWithProducts,
};
