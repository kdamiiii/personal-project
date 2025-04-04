import { DataTypes } from "sequelize";

// eslint-disable-next-line import/no-anonymous-default-export
export default (sequelize) => {
  return sequelize.define("Portal_User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
