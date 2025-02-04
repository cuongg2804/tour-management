import express, { Router } from "express";
import * as controller from "../../controller/client/tour.controller";
const router = express.Router();

router.get("/:slug", controller.index);

// [GET] /tours/detail/slug

router.get("/detail/:slug", controller.detail);

export const tourRouter : Router = router;