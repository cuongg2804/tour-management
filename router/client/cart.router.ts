import express, { Router } from "express";
import * as controller from "../../controller/client/cart.controller";
const router = express.Router();

router.get("/", controller.index);
//[POST] /cart/list-json
router.post("/list-json", controller.listJson);


export const cartRouter : Router = router;