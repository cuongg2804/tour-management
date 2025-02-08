import {Express} from "express";
import { systemConfig } from "../../config/system";
import {tourRouter} from "../admin/tour.router";
import { categoryRouter } from "../admin/category.router";
import {cartRouter} from "../client/cart.router";
import { orderRouter } from "../client/order.router";
const routerAdmin = (app : Express) : void => {

    app.use(`/${systemConfig.PREFIX_ADMIN}/tours`, tourRouter);

    app.use(`/${systemConfig.PREFIX_ADMIN}/categories`, categoryRouter);

    app.use(`/${systemConfig.PREFIX_ADMIN}/cart`, cartRouter);

    app.use(`/order`, orderRouter);
}

export default routerAdmin;