import { apiHostname } from "@/constants/generalTypes";
import { cookies } from "next/headers";
import { getDecodedCookies } from "./jwt";

type Credential = {
  username: string;
};

type Role = {
  role: string;
};

type UserRole = {
  role: string;
  Role: Role;
};

export type UserDataPayload = {
  name: string;
  email: string;
  Credential: Credential;
  User_Role: UserRole;
};

export type UserData = {
  name: string;
  email: string;
  role: string;
  username: string;
};

export const modifyUserdata = (userDataPayload: UserDataPayload) => {
  return {
    name: userDataPayload.name,
    email: userDataPayload.email,
    username: userDataPayload.Credential.username,
    role: userDataPayload.User_Role.Role.role,
  } as UserData;
};

export const fetchUserData = async (username: string) => {
  const res = await fetch(
    `
    ${apiHostname}/users/${username}`,
    {
      method: "GET",
    }
  );
  if (res.status >= 400) {
    return {};
  }
  const data = await res.json();
  return modifyUserdata(data);
};

export const fetchCurrentUserData: () => Promise<UserData> = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")!.value || "";
  const cookieData = (await getDecodedCookies(token)).payload as {
    username: string;
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
