/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Enrollment_Requirements", {
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
    },
    form_137: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    form_138: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    birth_certificate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    certified_true_copy: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    birth_certificate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    transfer_credential: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    official_transcript_of_record: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    permit_to_cross_enroll: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
};
