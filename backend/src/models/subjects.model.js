/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Subjects", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subject_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    subject_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    units: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    prerequisite: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    subject_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    default_course: {
      type: DataTypes.UUID,
      allowNull: true,
      reference: {
        model: "Courses",
        key: "id",
      },
    },
  });
};
