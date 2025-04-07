import { headers } from "next/headers";

export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const getCurrentUrl = (url: string) => {
  const splitUrl = url.split("/");
  return splitUrl[splitUrl.length - 1];
};
