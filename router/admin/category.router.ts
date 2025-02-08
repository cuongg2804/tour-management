import express, { Router } from "express";
import * as controller from "../../controller/admin/categories.controller";
const router = express.Router();

router.get("/", controller.index);

export const categoryRouter : Router = router;