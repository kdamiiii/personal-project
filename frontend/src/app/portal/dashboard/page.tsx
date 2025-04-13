import { fetchCurrentUserData } from "@/utils/fetchCurrentUser";

export default async function Dashboard() {
  const userData = await fetchCurrentUserData();

  return <p>Welcome back, {userData.firstName}!</p>;
}
