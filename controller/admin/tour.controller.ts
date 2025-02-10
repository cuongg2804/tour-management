import { Response, Request } from "express";
import Tour from "../../models/tours.model";
import Category from "../../models/category.model";
import { generateTourCode } from "../../helper/generateCode.helper";
import Tours_Categories from "../../models/tours_categories.model";
import { parse } from "path";
import {systemConfig} from "../../config/system";
import {Op} from "sequelize";


export const index = async (req : Request, res : Response) => {
    try {
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
        const countRecords = await Tour.count();
        objectPagination.totalPage = Math.ceil(countRecords/objectPagination.limitItems);
        
        const listTour = await Tour.findAll({
            where : find,
            limit : objectPagination.limitItems,
            offset : objectPagination.skip,
            raw: true
        })
        listTour.forEach(item => {
            if(item["images"]){
                const images = JSON.parse(item["images"]);
                item["image"] = images[0];
            }
            item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
        })
        res.render("admin/pages/tour/index.pug",{
            pageTitle :"Danh sách Tour",
            tours : listTour,
            keyword :  req.query.keyword,
            objectPagination : objectPagination
        }) 
    } catch (error) {
        res.redirect("back");
    }
}


// [GET] /admin/tours/create
export const create = async (req : Request, res : Response) => {
    const listCategory = await Category.findAll({
        where : {
            deleted : false,
            status : "active"
        },
        raw : true 
    })
    res.render("admin/pages/tour/create.pug", {
        pageTitle : "Tạo tour",
        categories : listCategory
    })
}

export const createPost = async (req : Request, res : Response) => {
   try {
    if(!req.body.position){
        req.body.position = await Tour.count() + 1;
    }
    const newTour = {
        title : req.body.title,
        code : "",
        images: JSON.stringify(req.body.images),
        price: parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        information: req.body.information,
        schedule: req.body.schedule,
        timeStart: req.body.timeStart ,
        stock: parseInt(req.body.stock),
        status: req.body.status,
        position: req.body.position
    }

    const tour = await Tour.create(newTour);
    const idTour = tour.getDataValue("id");

    const code = generateTourCode(idTour);

    await Tour.update({
        code : code
    },{
        where : {
            id: idTour
        }
    })

    const tours_categories = {
        tour_id : idTour,
        category_id : parseInt(req.body.category_id)
    }
    await Tours_Categories.create(tours_categories);

    res.redirect(`/${systemConfig.PREFIX_ADMIN}` +`/tours`);
    
   } catch (error) {
   }

}
// [GET] /admin/tours/detail/id
export const detail = async (req : Request, res : Response) => {
    try {
        const detailTour = await Tour.findOne({
            where:{
                id : req.params.id,
                deleted : false,
                status : "active"
            },
            raw : true
        })
        if(detailTour["images"]){
            const images = JSON.parse(detailTour["images"]);
            detailTour["image"] = images[0];
        }
        detailTour["price_special"] = (detailTour["price"] * (1 - detailTour["discount"] / 100));
        res.render("admin/pages/tour/detail.pug",{
            pageTitle : `Chi tiết Tour ${detailTour["title"]}`,
            detailTour : detailTour
        })
    } catch (error) {
        res.redirect("back");
    }
}

// [GET] /admin/tours/edit/id
export const edit = async (req : Request, res : Response) => {
    const tour = await Tour.findOne({
        where :{
            id : req.params.id,
            deleted : false
        },
        raw: true
    })

    const categories = await Category.findAll({
        where: {
            deleted : false,
            status : "active"
        },
        raw : true
    })

    const tour_category = await Tours_Categories.findOne({
        where: {
            tour_id : tour["id"]
        }
    })

    tour["category_id"] = tour_category["category_id"] ;
    res.render("admin/pages/tour/edit.pug",{
        pageTitle: `Chi tiết Tour ${tour["title"]}`,
        categories : categories,
        tour : tour
    })
}
// [patch] /admin/tours/edit
export const editPatch = async (req : Request, res : Response) => {
   await Tour.update({
        title : req.body.title,
        price: parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        information: req.body.information,
        schedule: req.body.schedule,
        timeStart: req.body.timeStart ,
        stock: parseInt(req.body.stock),
        status: req.body.status,
        position: req.body.position
    },{
        where: {
            id : req.params.id
        }
    });


    await Tours_Categories.update({
        category_id : parseInt(req.body.category_id)
    },{
        where :{
            tour_id : req.params.id
        }
    });
   
    res.redirect(`/${systemConfig.PREFIX_ADMIN}/tours`);
}

// [POST] /admin/tours/delete/:id

export const deleted = async (req : Request, res : Response) => {
    
    await Tour.update({
        deleted : true
    },{
        where : {
            id : req.params.id
        }
    })

    res.json({
        code : 200,
        message :"Xóa thành công !"
    })
}

// [GET] /admin/tours/:status/:id

export const changeStatus = async (req : Request, res : Response) => {
    await Tour.update({
        status : req.params.status
    },{
        where:{
            id : req.params.id
        }
    })
    res.redirect("back");
}