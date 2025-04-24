/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Enrollment_Course", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    enrollment_details_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Enrollment_Details",
        key: "id",
      },
      onDelete: "CASCADE",
      unique: false,
    },
    selected_course: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Courses",
        key: "id",
      },
      unique: false,
    },
  });
};
