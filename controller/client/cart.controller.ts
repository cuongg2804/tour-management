import { Response, Request } from "express";
import Tour from "../../models/tours.model";

export const index = async (req : Request, res : Response) => {
   
    res.render("client/pages/cart/index.pug",{
        pageTitle: "Giỏ hàng"
    });
}


//[POST] /cart/list-json
export const listJson = async (req : Request, res : Response) => {
    const tours = req.body;
    let listTour = [] ;
    let totalOrder = 0 ;
    for (const tour of tours) {
        const detailTour = await Tour.findOne({
            where : {
                id : tour.tourId
            },
            raw : true
        })
        detailTour["quantity"] =  tour.quantity;
        if(detailTour["images"]){
            detailTour["images"] = JSON.parse(detailTour["images"]);
            detailTour["image"] = detailTour["images"][0];
        }
        
        detailTour["price_special"] = (detailTour["price"] * (1 - detailTour["discount"]/100));
        detailTour["price"] = detailTour["price_special"] * tour.quantity;
        totalOrder += parseInt(detailTour["price"] );
        listTour.push(detailTour);
    }

    res.json({
        code : 200,
        message: "Thành công",
        listTour : listTour,
        totalOrder : totalOrder
    })
}