import express from "express";
import session from "express-session";
declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

import { EXPRESS_SESSION_SECRET, PORT, CookieConfig } from "./utils/config";
import { connectToDatabase } from "./utils/db";
import logger from "./utils/logger";
import usersRouter from "./routes/users";
import loginRouter from "./routes/login";
import timetablesRouter from "./routes/timetables";
import { User } from "./@types/global";

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: EXPRESS_SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cookie: CookieConfig as any,
  }),
);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/timetables", timetablesRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server running on port ${PORT}`);
});
