import { Response, Request } from "express"; 
import Role from "../../models/roles.models";

export const index = async (req : Request, res :Response) => {
    const rolesList = await Role.findAll({
        where:{
            deleted : false
        },
        raw: true
    })
    
    res.render("admin/pages/roles/index.pug",{
        pageTile: "Nhóm quyền",
        records : rolesList
    })
}