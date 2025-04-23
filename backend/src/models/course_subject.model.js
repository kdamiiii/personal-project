import { DataTypes } from "sequelize";
import CourseModel from "./courses.model.js";
import SubjectModel from "./subjects.model.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default (sequelize) => {
  const Course = CourseModel(sequelize);
  const Subject = SubjectModel(sequelize);

  return sequelize.define("Course_Subjects", {
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Course,
        key: "id",
      },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Subject,
        key: "id",
      },
      onDelete: "CASCADE",
      primaryKey: true,
    },
    student_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
