"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// All the imports whole project is dependent on to work smoothly.
const routing_controllers_1 = require("routing-controllers");
require("reflect-metadata");
const typedi_1 = require("typedi");
const ProductController_1 = require("./controllers/ProductController");
const WishlistController_1 = require("./controllers/WishlistController");
(0, routing_controllers_1.useContainer)(typedi_1.Container);
var compression = require("compression");
var morgan = require("morgan");
require("dotenv").config();
// creates express app, registers all controller routes and returns you express app instance
exports.app = (0, routing_controllers_1.createExpressServer)({
    cors: {
        maxAge: 7200,
    },
    defaultErrorHandler: false,
});
exports.app.use(morgan(process.env.LOG_FORMAT || "common"));
exports.app.use(compression());
(0, routing_controllers_1.useExpressServer)(exports.app, {
    controllers: [ProductController_1.ProductController, WishlistController_1.WishlistController],
    //  middlewares:[AuthMiddleware]
});
exports.app.listen(process.env.PORT, () => {
    console.log(`started server at port ${process.env.PORT}`);
});
