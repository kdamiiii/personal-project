import { DataTypes } from "sequelize";

// eslint-disable-next-line import/no-anonymous-default-export
export default (sequelize) => {
  return sequelize.define("Roles", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
