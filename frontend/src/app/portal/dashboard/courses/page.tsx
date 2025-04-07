import { Card } from "@/components/cards";
import { fetchCurrentUserData } from "@/utils/fetchUserData";

export default async function Courses() {
  const userData = await fetchCurrentUserData();

  return "KKKKK";
}
