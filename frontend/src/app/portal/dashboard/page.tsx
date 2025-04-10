import { fetchCurrentUserData } from "@/utils/fetchUserData";

export default async function Dashboard() {
  const userData = await fetchCurrentUserData();

  return <p>Welcome back, {userData.name}!</p>;
}
