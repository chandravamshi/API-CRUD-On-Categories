import { JsonController, Get, Post, Param, QueryParam, Res } from 'routing-controllers';
import { WishlistService } from '../services/WishlistService';
import { Service } from 'typedi';

@Service()
@JsonController('/wishlist')
export class WishlistController {
    private wishlistService = new WishlistService();

    @Post('/')
   async addProductToWishlist(@QueryParam('id') id: string, @Res() response: any): Promise<void> {
        try {

            const itemId = await this.wishlistService.addToWishlist(id);

            return response.status(200).send({
                status: "success",
                data: itemId,
            });

        } catch (error) {
            throw error
        }

    }

    @Get('/')
   async getWishlistItems(@Res() response: any): Promise<void> {
        try {

            const items = await this.wishlistService.getWishlistItems();

            return response.status(200).send({
                status: "success",
                data: items,
            });

        } catch (error) {
            throw error
        }

    }
}
