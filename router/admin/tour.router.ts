import express, { Router } from "express";
import * as controller from "../../controller/admin/tour.controller";
import multer from "multer";
import * as uploadCloud from "../../middlewares/uploadCloud.middlewares";
const upload = multer();
const router = express.Router();


router.get("/", controller.index);

// [GET] /admin/tours/create

router.get("/create", controller.create);

// [POST] /admin/tours/create

router.post("/create",
    upload.fields([{name : "images", maxCount: 10}]),
    uploadCloud.uploadFields,
    controller.createPost);

// [GET] /admin/tours/detail/:id 

router.get("/detail/:id", controller.detail);

// [GET] /admin/tours/edit/1

router.get("/edit/:id", controller.edit);

// [POST] /admin/tours/edit

router.patch("/edit/:id",
    upload.fields([{name : "images", maxCount: 10}]),
    uploadCloud.uploadFields,
    controller.editPatch);

export const tourRouter : Router = router;