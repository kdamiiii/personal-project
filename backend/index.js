import express from "express";
import { default as authRouter } from "./routes/authentication.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/authentication", authRouter);

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
