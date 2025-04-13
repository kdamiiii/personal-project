import { apiHostname } from "@/constants/generalTypes";
import { cookies } from "next/headers";
import { UserData, modifyUserdata } from "./fetchUserData";
import { getDecodedCookies } from "./jwt";

export const fetchCurrentUserData: () => Promise<UserData> = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")!.value || "";
  const cookieData = (await getDecodedCookies(token)).payload as {
    username: string;
    id: string;
  };
  const res = await fetch(
    `
        ${apiHostname}/users/${cookieData.username}`,
    {
      method: "GET",
    }
  );
  if (res.status >= 400) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  if (!data) {
  }
  return modifyUserdata(data);
};
