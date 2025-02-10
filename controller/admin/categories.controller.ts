import { Response, Request } from "express";
import Category from "../../models/category.model";
import {Op} from "sequelize";
import Tours_Categories from "../../models/tours_categories.model";
import { systemConfig } from "../../config/system";

export const index = async (req : Request, res : Response) => {
    const find = {
        deleted : false
    }

    //Search 
    if (req.query.keyword) {
        find["title"] = { [Op.like]: `%${req.query.keyword}%` };
    }

    //Pagination
    let objectPagination = {
        currentPage: 1,
        limitItems: 4,
        skip: 0,
        totalPage: 0
    }

    if(+(req.query.page) > 0) {
        objectPagination.currentPage = +(req.query.page);
    }
    
    objectPagination.skip = (objectPagination.currentPage - 1 ) * objectPagination.limitItems;
    const countRecords = await Category.count();
    objectPagination.totalPage = Math.ceil(countRecords/objectPagination.limitItems);

    const listCategory = await Category.findAll({
        where : find,
        limit : objectPagination.limitItems,
        offset : objectPagination.skip,
        raw: true
    })

 
    res.render("admin/pages/categories/index.pug", {
        pageTitle :"Danh mục",
        categories : listCategory,
        objectPagination : objectPagination,
        keyword : req.query.keyword
    });
}

// [GET] /admin/categories/detail/:id
export const detail = async (req : Request, res : Response) => {
    const detailCategory = await Category.findOne({
        where : {
            id : req.params.id,
            deleted: false
        },
        raw : true
    })
    const countTour = await Tours_Categories.count({
        where : {
            category_id : req.params.id
        }
    });
    detailCategory["countTour"] = countTour;
    res.render("admin/pages/categories/detail.pug",{
        pageTitle : `Chi tiết danh mục ${detailCategory["title"]}`,
        detailCategory : detailCategory
    })
}

// [GET] /admin/categories/create
export const create = async (req : Request, res : Response) => {
    res.render("admin/pages/categories/create.pug",{
        pageTitle :"Tạo mới danh mục"
    })
}
// [POST] /admin/categories/create
export const createPost = async (req : Request, res : Response) => {
    if(!req.body.position){
        req.body.position = await Category.count() +1;
    }
    const infoCategory = {
            title :req.body.title,
            description : req.body.description,
            image:req.body.images[0],
            status:req.body.status,
            position: req.body.position
    }

    await Category.create(infoCategory);
    res.redirect(`/${systemConfig.PREFIX_ADMIN}/categories`);
}
// [GET] /admin/categories/edit/:id
export const edit = async (req : Request, res : Response) => {
    const infoCategory = await Category.findOne({
        where:{
            id :req.params.id,
            deleted : false
        },
        raw : true
    })
    res.render("admin/pages/categories/edit.pug",{
        pageTitle:`Chỉnh sửa Danh mục ${infoCategory["title"]}`,
        infoCategory: infoCategory
    })
}
// [PATCH] /admin/categories/edit/:id
export const editPatch = async (req : Request, res : Response) => {
    await Category.update({
        title : req.body.title,
        description: req.body.description,
        position : parseInt(req.body.position),
        status: req.body.status
    },{
        where:{
            id:req.params.id
        }
    })
    res.redirect(`/${systemConfig.PREFIX_ADMIN}/categories`);
}
// [POST] /admin/categories/delete/:id
export const deleted = async (req : Request, res : Response) => {
    await Category.update({
        deleted : true
    },{
        where:{
            id: req.params.id
        }
    })
    res.json({
        code: 200,
        message:"Xóa thành công!"
    })
}

