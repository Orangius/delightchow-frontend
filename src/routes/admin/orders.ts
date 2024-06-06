import { Request, Response, Router } from "express";

const orderRoutes = Router();

orderRoutes.get("/orders", (request: Request, response: Response) => {
  response.send("Starting out with order page");
});

export default orderRoutes;
