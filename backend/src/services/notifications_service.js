import { Notifications } from "../models/index.js";

export const fetchNotifcationsFromDB = async (
  where,
  order,
  { include = [], limit, offset, attributes }
) => {
  try {
    const notification = await Notifications.findAll({
      where,
      limit,
      offset,
      include,
      attributes,
      order,
    });

    return notification;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
