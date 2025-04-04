import express from "express";
import cookieParser from "cookie-parser";
import { sequelize } from "./src/models/index.js";
import { default as authRouter } from "./src/routes/authentication.js";
import "dotenv/config";
import { credentialRouter } from "./src/routes/credentials.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/authentication", authRouter);
app.use("/credential", credentialRouter);
// app.post("/init", async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const user = await User.create({ name, email });
//     res.status(201).json(user);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

(async () => {
  try {
    await sequelize.sync({ force: false }); // Set force: true to reset tables on restart
    console.log("✅ Database synced.");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
})();
