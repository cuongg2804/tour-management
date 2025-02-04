import { Response, Request } from "express";
import Order from "../../models/order.model";
import { generateKey } from "crypto";
import { generateOrderCode } from "../../helper/generateCode.helper";
import { where } from "sequelize";
import OrderItem from "../../models/order-item.model";
import Tour from "../../models/tours.model";

export const index = async (req : Request, res : Response) => {
    const data = req.body;

    const dataOrder = {
        fullName : data.info.fullName,
        phone : data.info.phone,
        note : data.info.note,
        status: "initial"
    };

    const order = await Order.create(dataOrder);
    const orderId = order.getDataValue("id");
    const code = generateOrderCode(orderId);

    await Order.update(
        {
            code : code
        },
        {
            where: {
                id : orderId
            }
        }
    )

    for (const tour of data.cart) {
        const orderItem = {
            orderId : orderId,
            tourId : tour.tourId,
            quantity : tour.quantity
        }

        const inforTour = await Tour.findOne({
            where: {
                id : tour.tourId,
                deleted: false,
                status: "active"
            },
            raw: true
        })

        orderItem["price"] = inforTour["price"];
        orderItem["discount"] = inforTour["discount"];
        orderItem["timeStart"] = inforTour["timeStart"];

        await OrderItem.create(orderItem);
    }


    res.json({
        code : "200",
        message: "Đặt hàng thành công!",
        orderCode: code
    })
}

// [GET] /order/success
export const success = async (req : Request, res : Response) => {
    const order = await Order.findOne({
        where: {
            code : req.query.orderCode
        },
        raw : true
    })
    

    const listOrderItem = await OrderItem.findAll({
        where: {
            orderId: order["id"]
        },
        raw: true
    })
    let totalPrice =  0;
    for (const item of listOrderItem) {
        const inforTour = await Tour.findOne({
            where: {
                id: item["tourId"],
                deleted: false,
                status: "active"
            },
            raw : true
        })
        item["title"] = inforTour["title"];

        if(inforTour["images"]){
            item["image"] = JSON.parse(inforTour["images"])[0];
        }
        item["price_special"] = (inforTour["price"] * (1 - inforTour["discount"]/100));
        item["total"] = item["price_special"] * item["quantity"];
        totalPrice += item["price_special"];
    }
    console.log(listOrderItem);
   // res.send("ok");
    res.render("client/pages/cart/success.pug",{
        pageTitle: "Đặt hàng thành công!",
        order : order,
        ordersItem : listOrderItem,
        totalPrice :totalPrice
    })
}