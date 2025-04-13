import express from "express";
import cookieParser from "cookie-parser";
import { sequelize } from "./src/models/index.js";
import { default as authRouter } from "./src/routes/authentication.js";
import "dotenv/config";
import { credentialRouter } from "./src/routes/credentials.js";
import cors from "cors";
import { userRouter } from "./src/routes/user.js";
import courseRouter from "./src/routes/courses.js";
import { loggerMiddleware } from "./src/middlewares/logger.js";
import subjectsRouter from "./src/routes/subjects.js";
import classesRouter from "./src/routes/classes.js";

const app = express();
const PORT = process.env.PORT || 8000;

let corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(loggerMiddleware);

app.use("/authentication", authRouter);
app.use("/credential", credentialRouter);
app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/subjects", subjectsRouter);
app.use("/classes", classesRouter);

(async () => {
  try {
    await sequelize.sync({ force: false, alter: true }); // Set force: true to reset tables on restart
    console.log("✅ Database synced.");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
})();
