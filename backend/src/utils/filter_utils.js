import { Op } from "sequelize";

export const buildQuery = (
  filters,
  orderBy = "id",
  order = "asc",
  attributes = "*",
  allowedAttributes = []
) => {
  const where = {};
  const orderDirection = order.toLowerCase() === "desc" ? "DESC" : "ASC";

  for (const [key, value] of Object.entries(filters)) {
    if (value == null || value === "") continue;
    if (typeof value === "string") {
      where[key] = { [Op.iLike]: `%${value}%` };
    } else if (typeof value === "number") {
      where[key] = value;
    } else if (
      typeof value === "object" &&
      value.queryString &&
      Array.isArray(value.fields)
    ) {
      where[Op.or] = value.fields.map((field) => ({
        [field]: { [Op.iLike]: `%${value.queryString}%` },
      }));
    }
  }
  const orderQuery = [[orderBy, orderDirection]];
  const selectedAttributes =
    attributes === "*" ? allowedAttributes : attributes.split(",");

  return { where, orderQuery, selectedAttributes };
};

export const updateFieldIfValid = (
  fieldName,
  fieldValue,
  updateObject,
  currentValue
) => {
  if (
    fieldValue !== undefined &&
    fieldValue !== null &&
    currentValue !== fieldValue
  ) {
    updateObject[fieldName] = fieldValue;
  }
};
