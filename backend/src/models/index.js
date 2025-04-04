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

const User = UserModel(sequelize);
const Credential = CredentialModel(sequelize);

User.hasOne(Credential, { foreignKey: "userId", onDelete: "CASCADE" });
Credential.belongsTo(User, { foreignKey: "userId" });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

export { sequelize, User, Credential };
