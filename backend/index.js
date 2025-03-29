import express from "express";
import cookieParser from "cookie-parser";
import { default as authRouter } from "./src/routes/authentication.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/authentication", authRouter);

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
