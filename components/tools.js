"use client";

import en from "antd/locale/en_GB";
import tr from "antd/locale/tr_TR";
import { IconFlagTR, IconFlagEN } from "@/components/icons";
import { App } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useModalLogin } from "@/components/contexts/modalLoginContext";

const getLocale = { en: en, tr: tr };
const getDateTimeFormat = {
  en: "DD/MM/YYYY HH:mm:ss",
  tr: "DD.MM.YYYY HH:mm:ss",
};
const getDateFormat = {
  en: "DD/MM/YYYY",
  tr: "DD.MM.YYYY",
};

const getLanguageOptions = [
  {
    langCode: "tr",
    icon: <IconFlagTR className="h-5 w-5 rounded-full" />,
    name: "Türkçe",
  },
  {
    langCode: "en",
    icon: <IconFlagEN className="h-5 w-5 rounded-full" />,
    name: "English",
  },
];

const getPasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,16}$/;

const getEmailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const getIPAddressPattern = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

const getSpinIndicator = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const getLocalISOString = (date) => {
  const offset = date.getTimezoneOffset();
  const offsetAbs = Math.abs(offset);
  const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString();
  return `${isoString.slice(0, -1)}${offset > 0 ? "-" : "+"}${String(
    Math.floor(offsetAbs / 60)
  ).padStart(2, "0")}:${String(offsetAbs % 60).padStart(2, "0")}`;
};

const getStringToArrayBuffer = (string) => {
  const binaryString = window.atob(string);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

const getStringToImgUrl = (string) => {
  const arrayBuffer = getStringToArrayBuffer(string);
  const blob = new Blob([arrayBuffer]);
  return URL.createObjectURL(blob);
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const normalizeKeys = (obj) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  return Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
};

const useResponseHandler = () => {
  const { message, modal } = App.useApp();
  const modalLogin = useModalLogin();
  const handleResponse = (response, successMessage) => {
    response = normalizeKeys(response);
    if (response.status === "SUCCESS") {
      if (successMessage) {
        message.success(successMessage);
      }
    } else if (response.status === "401") {
      modalLogin.showModal();
    } else {
      const status = response?.status;
      const message = response?.message;
      const validationMessages = response?.validationmessages;
      const errorMessages = response?.errormessages;
      const errors = response?.errors;

      let errorMessage = "";
      if (status) {
        errorMessage += `<strong>Status:</strong> ${status}`;
      }
      if (message) {
        errorMessage += `<br><strong>Message:</strong> ${message}`;
      }
      if (validationMessages && validationMessages.length > 0) {
        const validationMessageString = validationMessages
          .map((message) => `<li>${message}</li>`)
          .join("");
        errorMessage += `<br><strong>Validation Messages</strong><ul style="list-style:inside;">${validationMessageString}</ul>`;
      }
      if (errorMessages && errorMessages.length > 0) {
        const errorMessagesString = errorMessages
          .map((message) => `<li>${message}</li>`)
          .join("");
        errorMessage += `<br><strong>Error Messages</strong><ul style="list-style:inside;">${errorMessagesString}</ul>`;
      }
      if (errors) {
        for (const prop in errors) {
          if (
            errors[prop] &&
            Array.isArray(errors[prop]) &&
            errors[prop].length > 0
          ) {
            const errorsString = errors[prop]
              .map((message) => `<li>${prop}: ${message}</li>`)
              .join("");
            errorMessage += `<br><strong>Errors</strong><ul style="list-style:inside;">${errorsString}</ul>`;
          }
        }
      }
      throw new Error(errorMessage);
    }
  };
  const handleError = (error, errorMessage) => {
    modal.error({
      title: errorMessage,
      content: <div dangerouslySetInnerHTML={{ __html: error?.message }}></div>,
    });
  };
  return { handleResponse, handleError };
};

const handleJustNumber = (e) => {
  e.target.value = e.target.value.replace(/\D/g, "");
};

const handleJustIPAddress = (e) => {
  e.target.value = e.target.value.replace(/[^\d.]/g, "");
};

const formatDate = (val, lang, showTime = true) => {
  const date = new Date(val);
  if (isNaN(date.getTime())) {
    return "";
  }
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  if (showTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
    options.hour12 = false;
  }

  const formatted = new Intl.DateTimeFormat(
    lang === "en" ? "en-GB" : lang,
    options
  ).format(date);
  return formatted;
};

const formatMoney = (params) => {
  const value = params.value;
  return `₺ ${value.toLocaleString("tr-TR")}`;
};

const formatDateSimpleFormat = (time) => {
  const t = new Date(time);
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
};

const replaceUndefinedWithNull = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [key, value === undefined ? null : value];
    })
  );
};
const handleLocaleUpperCase = (value, lang) => {
  return value.toLocaleUpperCase(lang);
};

export {
  getLocale,
  getDateTimeFormat,
  getDateFormat,
  getEmailPattern,
  getIPAddressPattern,
  getLanguageOptions,
  getPasswordPattern,
  getSpinIndicator,
  getLocalISOString,
  getStringToImgUrl,
  getStringToArrayBuffer,
  getBase64,
  useResponseHandler,
  handleJustNumber,
  handleJustIPAddress,
  formatDate,
  formatMoney,
  formatDateSimpleFormat,
  replaceUndefinedWithNull,
  handleLocaleUpperCase,
};
