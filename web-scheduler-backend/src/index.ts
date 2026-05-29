import express from "express";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
declare module "express-session" {
  interface SessionData {
    user: User | null;
  }
}
const SequelizeStore = connectSessionSequelize(session.Store);

import { EXPRESS_SESSION_SECRET, PORT, CookieConfig } from "./utils/config";
import { connectToDatabase, sequelize } from "./utils/db";
import logger from "./utils/logger";
import usersRouter from "./routes/users";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import timetablesRouter from "./routes/timetables";
import { User } from "./@types/global";
import authSessionRouter from "./routes/authSession";

const app = express();
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
});

app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: EXPRESS_SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: CookieConfig,
  }),
);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/timetables", timetablesRouter);
app.use("/api/auth/session", authSessionRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  sessionStore.sync();
  logger.info(`Server running on port ${PORT}`);
});
