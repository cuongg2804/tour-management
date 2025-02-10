import express, {Router} from "express";
import * as controller from "../../controller/admin/roles.controller";

const router = express.Router();

router.get("/", controller.index)

export const rolesRouter : Router = router;