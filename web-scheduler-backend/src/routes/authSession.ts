import express from "express";

const authSessionRouter = express.Router();

authSessionRouter.get("/", async (req, res) => {
  const currentUser = req.session.user;
  console.log(currentUser);
  if (currentUser) {
    res.send(currentUser).status(200);
  } else {
    res.send({ authError: "no active session" }).status(401);
  }
});

export default authSessionRouter;
