// All the imports whole project is dependent on to work smoothly.
import {
  createExpressServer,
  useContainer,
  useExpressServer,
} from "routing-controllers";
import "reflect-metadata";
import { Container } from "typedi";
import { ProductController } from "./controllers/ProductController";
import { WishlistController } from "./controllers/WishlistController";

useContainer(Container);
let compression = require("compression");
let morgan = require("morgan");
require("dotenv").config();
// creates express app, registers all controller routes and returns you express app instance
export const app = createExpressServer({
  defaultErrorHandler: false,
});
app.use(morgan(process.env.LOG_FORMAT || "common"));
app.use(compression());


useExpressServer(app, {
  controllers: [ProductController, WishlistController]
});



app.listen(process.env.PORT, () => {
  console.log(`started server at port ${process.env.PORT}`);
});

