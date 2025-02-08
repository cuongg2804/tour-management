import { Response, Request } from "express";
import Category from "../../models/category.model";

export const index = async (req : Request, res : Response) => {
    const listCategory = await Category.findAll({
        where : {
            deleted : false
        },
        raw: true
    })

 
    res.render("admin/pages/categories/index.pug", {
        pageTitle :"Danh mục",
        categories : listCategory
    });
}