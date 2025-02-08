import {Express} from "express";

import { systemConfig } from "../../config/system";
import {tourRouter} from "./tour.router";
import { categoryRouter } from "./category.tour";
import {cartRouter} from "./cart.router";
import { orderRouter } from "./order.router";
const routerClient = (app : Express) : void => {
    app.use(`/tours`, tourRouter);

    app.use(`/categories`, categoryRouter);

    app.use(`/cart`, cartRouter);

    app.use(`/order`, orderRouter);
}

export default routerClient;