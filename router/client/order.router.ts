import express, { Router } from "express";
import * as controller from "../../controller/client/order.controller";
const router = express.Router();

router.post("/", controller.index);

// [GET] /order/success

router.get("/success", controller.success);

export const orderRouter : Router = router;