import Sequelize from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

import UserModel from "./portal_users.model.js";
import CredentialModel from "./credentials.model.js";
import RoleModel from "./roles.model.js";
import UserRoleModel from "./user_roles.model.js";
import CourseModel from "./courses.model.js";
import SubjectModel from "./subjects.model.js";
import CourseSubjectModel from "./course_subject.model.js";
import ClassesModel from "./classes.model.js";
import EnrollmentDetailsModel from "./enrollment/enrollment_details.model.js";
import ParentsDetailsModel from "./enrollment/parents_details.model.js";
import SchoolsDetailsModel from "./enrollment/schools_details.model.js";
import EnrollmentRequirementsModel from "./enrollment/enrollment_requirements.model.js";
import EnrollmentCourseModel from "./enrollment/enrollment_course.model.js";
import NotificationsModel from "./notifications.model.js";
import CalendarEventsModel from "./calendar_events_model.js";

const User = UserModel(sequelize);
const Credential = CredentialModel(sequelize);
const Role = RoleModel(sequelize);
const UserRole = UserRoleModel(sequelize);
const Course = CourseModel(sequelize);
const Subject = SubjectModel(sequelize);
const CourseSubject = CourseSubjectModel(sequelize);
const Classes = ClassesModel(sequelize);
const EnrollmentDetails = EnrollmentDetailsModel(sequelize);
const ParentsDetails = ParentsDetailsModel(sequelize);
const SchoolsDetails = SchoolsDetailsModel(sequelize);
const EnrollmentRequirements = EnrollmentRequirementsModel(sequelize);
const EnrollmentCourse = EnrollmentCourseModel(sequelize);
const Notifications = NotificationsModel(sequelize);
const CalendarEvents = CalendarEventsModel(sequelize);

User.hasOne(Credential, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasOne(UserRole, { foreignKey: "userId" });
User.hasMany(Course, { foreignKey: "id" });
User.hasMany(Classes, { foreignKey: "class_instructor" });
User.hasMany(Notifications, { foreignKey: "for_user" });
User.hasOne(EnrollmentDetails, { foreignKey: "enrollment_id" });
EnrollmentDetails.belongsTo(User, { foreignKey: "enrollment_id" });
Notifications.belongsTo(User, { foreignKey: "for_user" });
Credential.belongsTo(User, { foreignKey: "userId" });
UserRole.belongsTo(User, { foreignKey: "userId" });
UserRole.belongsTo(Role, { foreignKey: "role" });
Role.hasMany(UserRole, { foreignKey: "role" });
Course.belongsTo(User, { foreignKey: "userId" });
// CalendarEvents.hasMany(UserRole, {
//   foreignKey: "for_role",
//   as: "CalendarEvents",
// });

Course.belongsToMany(EnrollmentDetails, {
  through: EnrollmentCourse,
  foreignKey: "selected_course",
  otherKey: "enrollment_details_id",
  as: "enrollments",
});
EnrollmentDetails.belongsToMany(Course, {
  through: EnrollmentCourse,
  foreignKey: "enrollment_details_id",
  otherKey: "selected_course",
  as: "courses",
});

/*---------------------------------------------------*/

Course.hasMany(Subject, { foreignKey: "default_course" });
Subject.hasMany(Classes, { foreignKey: "class_subject" });
Subject.belongsTo(Course, { foreignKey: "default_course" });
Subject.hasMany(CourseSubject, {
  foreignKey: "subjectId",
  as: "SubjectRequirement",
});
CourseSubject.belongsTo(Subject, { foreignKey: "subjectId" });
Classes.belongsTo(User, { foreignKey: "class_instructor" });
Classes.belongsTo(Subject, { foreignKey: "class_subject" });

//Enrollment
ParentsDetails.belongsTo(EnrollmentDetails, {
  foreignKey: "enrollment_id",
  as: "Parent_Details",
});
SchoolsDetails.belongsTo(EnrollmentDetails, {
  foreignKey: "enrollment_id",
});
EnrollmentRequirements.belongsTo(EnrollmentDetails, {
  foreignKey: "enrollment_id",
});
EnrollmentDetails.hasOne(ParentsDetails, {
  foreignKey: "enrollment_id",
  as: "Parent_Details",
});
EnrollmentDetails.hasMany(SchoolsDetails, {
  foreignKey: "enrollment_id",
});
EnrollmentDetails.hasMany(EnrollmentRequirements, {
  foreignKey: "enrollment_id",
});

Course.belongsToMany(Subject, {
  through: CourseSubject,
  foreignKey: "courseId",
  as: "CourseSubjects",
});
Subject.belongsToMany(Course, {
  through: CourseSubject,
  foreignKey: "subjectId",
  as: "SubjectCourses",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

export {
  sequelize,
  User,
  Credential,
  Role,
  UserRole,
  Course,
  Subject,
  CourseSubject,
  Classes,
  EnrollmentDetails,
  ParentsDetails,
  SchoolsDetails,
  EnrollmentRequirements,
  EnrollmentCourse,
  Notifications,
  CalendarEvents,
};
