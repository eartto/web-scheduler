import express from "express";
import { Request, Response } from "express";
import keygen from "../utils/keygen";

const timetables: Array<object> = [];

const timetablesRouter = express.Router();

timetablesRouter.get("/", (_req: Request, res: Response) => {
  res.json(timetables);
});

timetablesRouter.post("/", (req: Request, res: Response) => {
  // IMPLEMENT n IN THE KEYGEN WHEN DB IS IMPLEMENTED
  const key = keygen.generateKey();
  const timetable = { ...req.body, key };
  console.log(timetable)
  timetables.push(timetable);

  res.json(timetable);
});

export default timetablesRouter;
