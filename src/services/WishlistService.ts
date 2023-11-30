import { ProductDTO } from "../dto/ProductDTO";
import { ProductService } from "./ProductService";
import * as fs from "fs";
import * as path from "path";
import { Service } from "typedi";
import * as util from 'util';


@Service()
export class WishlistService {
    private productService: ProductService;
    private wishlistFilePath = path.join(__dirname, '../../data/data/wishlistIds.json');
    private readFile = util.promisify(fs.readFile);
    private writeFile = util.promisify(fs.writeFile);

    constructor() {
        this.productService = new ProductService();
        this.ensureWishlistFileExists();
    }

    private async ensureWishlistFileExists() {
        if (!fs.existsSync(this.wishlistFilePath)) {
            await this.writeFile(this.wishlistFilePath, JSON.stringify([]));
        }
    }

    private async readWishlistFile() {
        const fileContents = await this.readFile(this.wishlistFilePath, 'utf8');
        return JSON.parse(fileContents);
    }

    private async writeWishlistFile(wishlistIds: string[]) {
        try {
            await this.writeFile(this.wishlistFilePath, JSON.stringify(wishlistIds));

        } catch (error) {
            throw error
        }
    }

    async addToWishlist(productId: string): Promise<string> {
        try {
            const product = await this.productService.getProductById(productId);
            if (product) {
                const wishlistIds = await this.readWishlistFile();
                if (!wishlistIds.includes(productId)) {
                    wishlistIds.push(productId);
                    await this.writeWishlistFile(wishlistIds);
                }
                return productId;
            } else {
                throw new Error("Product not found");
            }

        } catch (error) {
            throw error
        }

    }

    async getWishlistItems(): Promise<ProductDTO[]> {
        try {
            const wishlistIds = await this.readWishlistFile();
            const productsPromises = wishlistIds.map(id => this.productService.getProductById(id));
            const products = (await Promise.all(productsPromises)).filter(p => p) as ProductDTO[];
            return products;

        } catch (error) {
            throw error
        }
    }
}
