import { apiHostname } from "@/constants/generalTypes";
import { useQuery } from "@tanstack/react-query";

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
  id: string;
  email: string;
  Credential: Credential;
  first_name: string;
  last_name: string;
  User_Role: UserRole;
};

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  username: string;
};

export const modifyUserdata = (userDataPayload: UserDataPayload) => {
  return {
    id: userDataPayload.id,
    firstName: userDataPayload.first_name,
    lastName: userDataPayload.last_name,
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

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const fetchUsersData = async (): Promise<UserData[]> => {
  const res = await fetch(
    `
    ${apiHostname}/users/`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data.map((user: UserDataPayload) => modifyUserdata(user));
};
