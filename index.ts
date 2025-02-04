import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import routerClient from "./router/client/index.router";
import bodyParser from "body-parser";

dotenv.config();
const port: (number | string) =  process.env.PORT|| 3000 ;

const app: Express = express();
app.use(bodyParser.json());
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));

routerClient(app);

app.listen(port, () => {
    console.log(`Đã kết nối tối cổng ${port}` );
});