export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const getCurrentUrl = (url: string) => {
  const splitUrl = url.split("/");
  return splitUrl[splitUrl.length - 1];
};

export const getEnumValues = <T extends Record<string, string | number>>(
  enumObj: T
): string[] => {
  return Object.values(enumObj) as string[];
};

export const getEnumKeyFromValue = (
  enumObj: Record<string, string | number>,
  value: string
) => {
  return Object.entries(enumObj).find(([, val]) => val === value)?.[0];
};

export const getSelectedTab = (url: string, link: string) => {
  const splitUrl = url.split("/");
  if (splitUrl.length > 4) {
    splitUrl.pop();
    return splitUrl.join("/") === link;
  }
  return url === link;
};

export const removeMiliseconds = (date: string) => {
  return date.split(":")[0] + ":" + date.split(":")[1];
};

export const checkScheduleText = (text: string) => {
  return text
    .split("")
    .map((letter) => {
      if (letter === "R") return "TH";
      else if (letter === "U") return "SU";
      return letter;
    })
    .join("");
};
