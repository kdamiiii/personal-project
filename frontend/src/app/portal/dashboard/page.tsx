import { Card } from "@/components/cards";
import { apiHostname } from "@/constants/generalTypes";

type UserData = {
  name: string;
};

export default async function Dashboard() {
  const userData: UserData = await fetchUserData("kdamiiii");

  return (
    <Card className="flex flex-col w-[80%] h-[50em] items-center p-10 gap-6 bg-white">
      Welcome back, {userData.name}!
    </Card>
  );
}

const fetchUserData = async (username: string) => {
  const res = await fetch(
    apiHostname + "/users/a0480c4e-99a8-4021c-a523-5ba43f35be55",
    {
      method: "GET",
    }
  );

  if (res.status >= 400) {
    return {};
  }
  const data = await res.json();

  return data;
};
