import { Response, Request } from "express";
import Tour from "../../models/tours.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";


export const index = async (req : Request, res : Response) => {
    const slug = req.params.slug;
    const toursList = await sequelize.query(`
        select tours.*,ROUND(price * (1 - discount/100), 0) AS price_special
        from tours 
        inner join tours_categories
        on tours.id = tours_categories.tour_id
        inner join categories 
        on tours_categories.category_id = categories.id
        where 
            categories.slug = '${slug}'
            and categories.deleted = false
            and  categories.status= 'active'
            and tours.deleted = false
            and  tours.status= 'active'
        `,{
            type : QueryTypes.SELECT
        })
    toursList.forEach(tour => {
        const images = JSON.parse(tour["images"]);
        tour["image"] = images[0];
        tour["price_special"] = +tour["price_special"];
    })
    console.log(toursList);
    res.render("client/pages/tour/index.pug",{
        pageTitle: "Danh sách tour",
        toursList : toursList
    });
}

// [GET] /tours/detail/slug

export const detail = async (req: Request, res: Response) => {
    const slug = req.params.slug;

    const detailTour = await Tour.findOne({
        where: {
            slug : slug,
            status: "active",
            deleted: false
        },
        raw : true
    });
    if(detailTour["images"]){
        detailTour["images"] = JSON.parse(detailTour["images"]);
    }
  
    detailTour["price_special"] = (detailTour["price"] * (1 - detailTour["discount"]/100));

    res.render("client/pages/tour/detail.pug",{
        pageTitle: `Chi tiết ${detailTour["title"]}`,
        tourDetail : detailTour
    })
}