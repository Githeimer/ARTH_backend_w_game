import { Router as router } from "express";

const Router = router();

Router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello this is the get route of ARTH_GAME_BACKENd" });
});

export default Router;
