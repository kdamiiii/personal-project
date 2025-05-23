/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Schools_Details", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    enrollment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Enrollment_Details",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    elementary_school: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    elementary_year_graduated: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    junior_high_school: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    junior_high_school_year_graduated: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    senior_high_school: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    senior_high_school_year_graduated: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_school_attended: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_school_attended_year_graduated: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
