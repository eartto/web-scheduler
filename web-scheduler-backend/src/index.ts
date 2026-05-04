import { PORT } from "./utils/config";
import { connectToDatabase } from "../src/utils/db";
import express from "express";
const app = express();

import logger from "./utils/logger";
import usersRouter from "./routes/users";
import loginRouter from "./routes/login";
import timetablesRouter from "./routes/timetables";

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/timetables", timetablesRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server running on port ${PORT}`);
});
