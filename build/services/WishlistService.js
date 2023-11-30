"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const ProductService_1 = require("./ProductService");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const typedi_1 = require("typedi");
const util = __importStar(require("util"));
let WishlistService = class WishlistService {
    constructor() {
        this.wishlistFilePath = path.join(__dirname, '../../data/data/wishlistIds.json');
        this.readFile = util.promisify(fs.readFile);
        this.writeFile = util.promisify(fs.writeFile);
        this.productService = new ProductService_1.ProductService();
        this.ensureWishlistFileExists();
    }
    ensureWishlistFileExists() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(this.wishlistFilePath)) {
                yield this.writeFile(this.wishlistFilePath, JSON.stringify([]));
            }
        });
    }
    readWishlistFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const fileContents = yield this.readFile(this.wishlistFilePath, 'utf8');
            return JSON.parse(fileContents);
        });
    }
    writeWishlistFile(wishlistIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.writeFile(this.wishlistFilePath, JSON.stringify(wishlistIds));
            }
            catch (error) {
                throw error;
            }
        });
    }
    addToWishlist(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.getProductById(productId);
                if (product) {
                    const wishlistIds = yield this.readWishlistFile();
                    if (!wishlistIds.includes(productId)) {
                        wishlistIds.push(productId);
                        yield this.writeWishlistFile(wishlistIds);
                    }
                    return productId;
                }
                else {
                    throw new Error("Product not found");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getWishlistItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wishlistIds = yield this.readWishlistFile();
                const productsPromises = wishlistIds.map(id => this.productService.getProductById(id));
                const products = (yield Promise.all(productsPromises)).filter(p => p);
                return products;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], WishlistService);
