"use server";

import { cookies } from "next/headers";

//  #region fetch işlemleri

const getAcceptLanguage = (lang) => {
  return `${lang}-${lang.toUpperCase()}`;
};

const getApiUrl = (endpoint) => {
  // Ortam değişkenlerini kontrol ederek API URL'sini belirle
  const baseUrl = process.env.API_URL;

  // Endpoint'i URL'ye ekle
  return `${baseUrl}${endpoint}`;
};

const fetchData = async ({ url, method, lang, body = null, token = null }) => {
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": getAcceptLanguage(lang),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchOptions = {
    cache: "no-store",
    method: method,
    headers: headers,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  url = getApiUrl(url);
  let res = await fetch(url, fetchOptions);
  res = await validResponse(res);
  return JSON.parse(res);
};
//  #endregion fetch işlemleri

// #region Auth işlemleri
const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return token?.value;
};

const getTokenValue = async () => {
  const token = await getToken();
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const decode = Buffer.from(base64, "base64").toString("utf-8");
  // -- encode etmek için not olsun => Buffer.from(value, "utf-8").toString("base64");
  return JSON.parse(decode);
};

// #endregion Auth işlemleri

// #region response kodları

const validResponse = async (res, fetchUrl, values, type) => {
  if (res?.ok) {
    let response = null;
    try {
      response = await res.json();
    } catch {
      response = {
        isSuccess: true,
      };
    }
    return JSON.stringify(response);
  } else {
    let messages = "";
    let errorsMessages = "";
    try {
      errorsMessages = await res.json();
    } catch {}
    if (res?.status == 401) {
      try {
        const cookieStore = cookies();
        cookieStore.set("token", "");
        messages = `Sunucu Kaynaklı Hata: ${res?.status} - ${res?.statusText}`;
      } catch {}
    } else {
      messages = `Sunucu Kaynaklı Hata: ${res?.status} - ${
        res?.statusText
      } - İstek Bilgileri: ${fetchUrl?.replace(
        process.env.API_URL,
        "api/"
      )} - ${type} - ${JSON.stringify(values)} - Hata Detayları: ${
        errorsMessages?.message
      }`;
    }
    const response = {
      data: [],
      message: messages,
      isSuccess: false,
      totalCount: 0,
    };
    return JSON.stringify(response);
  }
};

// #endregion response kodları

export { fetchData, getToken, validResponse, getTokenValue };
