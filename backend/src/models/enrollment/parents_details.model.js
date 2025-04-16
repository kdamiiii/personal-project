/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Guardian_Details", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    father_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    father_occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    father_contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    father_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mother_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mother_occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mother_contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mother_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guardian_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guardian_relationship: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guardian_contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employer_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employer_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employer_contact_number: {
      type: DataTypes.STRING,
      allowNull: true,
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
  });
};
