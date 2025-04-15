/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Enrollment_Details", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    suffix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provincial_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    birth_place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    religious_affiliation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    civil_status: {
      type: DataTypes.ENUM("SINGLE", "MARRIED", "WIDOWED", "DIVORCED"),
      allowNull: false,
    },
  });
};
