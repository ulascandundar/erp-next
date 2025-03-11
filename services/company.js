"use server";

import { fetchData } from "@/components/ssrTools";

const getCompany = async (lang) => {
  let response = await fetchData({
    url: `company`,
    lang: lang,
    method: "GET",
  });

  return response;
};

const postCompany = async (values, lang) => {
  let response = await fetchData({
    url: `company`,
    method: "POST",
    lang: lang,
    body: values,
  });

  return response;
};

const getCompanyById = async (lang, id) => {
  let response = await fetchData({
    url: `company/${id}`,
    method: "GET",
    lang: lang,
  });

  return response;
};

const deleteCompanyById = async (lang, id) => {
  let response = await fetchData({
    url: `company/${id}`,
    method: "DELETE",
    lang: lang,
  });

  return response;
};

const putCompany = async (values, lang) => {
  let response = await fetchData({
    url: `company${values?.id}`,
    method: "PUT",
    lang: lang,
    body: values,
  });

  return response;
};

export {
  getCompany,
  postCompany,
  getCompanyById,
  deleteCompanyById,
  putCompany,
};
