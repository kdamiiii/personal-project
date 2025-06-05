import { Op } from "sequelize";
import { respondWithHttpError } from "../utils/error_utils.js";
import {
  insertCalendarEvent,
  fetchCalendarEvents,
} from "../services/calendar_events_service.js";

export const createCalendarEvent = async (req, res) => {
  try {
    const { title, description, date, for_role } = req.body;

    if (!title || !description || !date || !for_role) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEvent = await insertCalendarEvent({
      title,
      description,
      date: new Date(date),
      for_role,
    });

    return res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return respondWithHttpError(error, res);
  }
};

export const getCalendarEvents = async (req, res) => {
  try {
    const { month, year } = req.query;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0); // The 0th day of next month = last day of current month

    const whereQ = {
      date: {
        [Op.between]: [
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0],
        ],
      },
    };

    const events = await fetchCalendarEvents(whereQ);

    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return respondWithHttpError(error, res);
  }
};
