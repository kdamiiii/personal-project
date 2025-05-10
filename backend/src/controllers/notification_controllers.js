import { notifications_attributes } from "../constants/allowed_attributes.js";
import { fetchNotifcationsFromDB } from "../services/notifications_service.js";
import { respondWithHttpError } from "../utils/error_utils.js";
import { buildQuery } from "../utils/filter_utils.js";

export const getNotifications = async (req, res) => {
  try {
    const user = req.user;

    const {
      orderBy = "createdAt",
      order = "desc",
      attributes = "*",
      limit = 10,
      offset = 0,
    } = req.query;

    const { orderQuery, selectedAttributes } = buildQuery(
      {},
      orderBy,
      order,
      attributes,
      notifications_attributes
    );

    const notifications = await fetchNotifcationsFromDB(
      { for_user: user.id },
      orderQuery,
      {
        limit,
        offset,
        selectedAttributes,
      }
    );

    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const createNotification = async (req, res) => {
  try {
    const notification = res.status(201).json(notification);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};
