import express from "express";
import { Request, Response } from "express";
import keygen from "../utils/keygen";
import models from "../models";

const timetablesRouter = express.Router();

timetablesRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const timetables = await models.Timetable.findAll();
    res.json(timetables);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).end();
    }
  }
});

timetablesRouter.get("/:id", async (req, res) => {
  try {
    console.log("ID");
    console.log(req.params.id);
    const timetable = await models.Timetable.findByPk(req.params.id);
    console.log(timetable)
    res.json(timetable);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).end();
    }
  }
});

timetablesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = req.session.user;
    console.log(user);
    console.log(req.body);
    const key = await keygen.generateKey();
    const timetable = await models.Timetable.create({
      ...req.body,
      key,
      userId: user!.id,
    });
    res.json(timetable);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).end();
    }
  }
});

export default timetablesRouter;
