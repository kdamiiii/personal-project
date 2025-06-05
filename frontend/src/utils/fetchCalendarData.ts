import { apiHostname } from "@/constants/generalTypes";
import { useQuery } from "@tanstack/react-query";

type CalendarEventPayload = {
  title: string;
  description: string;
  date: string;
};

export const fetchCalendarData = async (
  month: number,
  year: number
): Promise<Array<CalendarEventPayload>> => {
  try {
    const res = await fetch(
      `
      ${apiHostname}/calendar_events?month=${month}&year=${year}`,
      {
        method: "GET",
      }
    );

    if (res.status >= 400) {
      return [];
    }
    const data: CalendarEventPayload[] = await res.json();
    return data;
  } catch (e) {
    console.log("error fetching classes", e);
    return [];
  }
};

export const useFetchCalendarEvents = (month: number, year: number) => {
  return useQuery({
    queryKey: ["events", month, year],
    queryFn: () => fetchCalendarData(month, year),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
