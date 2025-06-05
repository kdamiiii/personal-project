import { CalendarEvents } from "../models/index.js";

export const insertCalendarEvent = async ({
  title,
  description,
  date,
  for_role,
}) => {
  try {
    const newEvent = await CalendarEvents.create({
      title,
      description,
      date,
      for_role,
    });

    return newEvent;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const fetchCalendarEvents = async (where) => {
  try {
    const events = await CalendarEvents.findAll({
      where,
    });

    return events;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
