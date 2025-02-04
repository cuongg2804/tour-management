import { Response, Request } from "express";
import Category from "../../models/category.model";

export const index = async (req : Request, res : Response) => {
    const listCategory = await Category.findAll({
        where : {
            deleted: false,
            status: "active"
        },
        raw : true
    })
    res.render("client/pages/category/index.pug",{
        pageTitle: "Danh sách tour",
        listCategory : listCategory
    });
}