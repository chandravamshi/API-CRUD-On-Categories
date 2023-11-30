import * as fs from "fs";
import * as path from "path";
import { ProductDTO } from "../dto/ProductDTO";
import { Service } from "typedi";

@Service()
export class ProductService {
    private products: ProductDTO[] = [];

    constructor() {
        this.loadProducts();
    }

    private loadProducts() {
        const productCategories = ['coffin', 'flower', 'urn'];
        productCategories.forEach(category => {
            const filePath = path.join(__dirname, `../../data/data/${category}.json`);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const items = JSON.parse(fileContents) as ProductDTO[];
            this.products.push(...items);
        });
    }

    async getProductsByCategory(category: string): Promise<ProductDTO[]> {
        try {
            const products = await this.products.filter(product => product.category === category);
            return products
        } catch (error) {
            throw error
        }
    }

    async getProductById(id: string): Promise<ProductDTO | undefined> {
        try {
            const products = await this.products.find(product => product.id === id);
            return products
        } catch (error) {
            throw error
        }
    }
}
