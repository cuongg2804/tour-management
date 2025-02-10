import express, { Router } from "express";
import * as controller from "../../controller/admin/categories.controller";
import multer from "multer";
import * as uploadCloud from "../../middlewares/uploadCloud.middlewares";
const upload = multer();

const router = express.Router();
 
router.get("/", controller.index);

// [GET] /admin/categories/detail/:id

router.get("/detail/:id", controller.detail);

// [GET] /admin/categories/create

router.get("/create", controller.create);

// [POST] /admin/categories/create

router.post("/create",  upload.fields([{name : "images", maxCount: 10}]),
    uploadCloud.uploadFields, controller.createPost);

// [GET] /admin/categories/edit/:id

router.get("/edit/:id", controller.edit);

// [PATCH] /admin/categories/edit/:id

router.patch("/edit/:id", controller.editPatch);

// [POST] /admin/categories/delete/:id

router.get("/delete/:id",controller.deleted);

export const categoryRouter : Router = router;