import { JsonController, Get, Param, QueryParam, Res } from 'routing-controllers';
import { ProductService } from '../services/ProductService';
import { Service } from 'typedi';

@Service()
@JsonController('/products')
export class ProductController {
    constructor(private productService: ProductService) { }


    @Get('/category/')
    async getProductsByCategory(@QueryParam('category') category: string
    ,  @Res() response: any): Promise<void> {
        try {

        const products = this.productService.getProductsByCategory(category);

        return response.status(200).send({
            status: "success",
            data: products,
          });    
        } catch (error) {
            throw error
        }
    }
}
