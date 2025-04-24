import { DataTypes } from "sequelize";

// eslint-disable-next-line import/no-anonymous-default-export
export default (sequelize) => {
  return sequelize.define("Portal_User", {
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
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    student_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    enrollment_id: {
      type: DataTypes.UUID,
      allowNull: true,
      reference: {
        model: "Enrollment_Details",
        key: "id",
      },
    },
  });
};
