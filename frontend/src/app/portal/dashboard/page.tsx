import { Card } from "@/components/cards";
import { fetchCurrentUserData } from "@/utils/fetchUserData";

export default async function Dashboard() {
  const userData = await fetchCurrentUserData();

  return (
    <Card className="flex flex-col w-[80%] h-[50em] items-center p-10 gap-6 bg-white">
      Welcome back, {userData.name}!
    </Card>
  );
}
