import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import routerClient from "./router/client/index.router";
import routerAdmin from "./router/admin/index.router";
import bodyParser from "body-parser";
import { systemConfig } from "./config/system"; "./config/system";
import path from "path";
import methodOverride from "method-override";

dotenv.config();
const port: (number | string) =  process.env.PORT|| 3000 ;

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")));
app.use(methodOverride('_method'))

app.locals.prefixAdmin = systemConfig.PREFIX_ADMIN;
routerClient(app);
routerAdmin(app);

app.listen(port, () => {
    console.log(`Đã kết nối tối cổng ${port}` );
});