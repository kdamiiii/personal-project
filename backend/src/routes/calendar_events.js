import express from "express";
import {
  getCalendarEvents,
  createCalendarEvent,
} from "../controllers/calendar_events_controller.js";

const calendarEventsRouter = express.Router();

calendarEventsRouter.get("/", getCalendarEvents);
calendarEventsRouter.post("/", createCalendarEvent);

export default calendarEventsRouter;
