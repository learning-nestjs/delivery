import { Controller, Post, Body, Delete, Get, Param } from '@nestjs/common';
import { Cart } from './cart';
import { Item } from './item.model';

@Controller('cart')
export class CartController {
    constructor(private cart: Cart) { }

    @Post()
    add(@Body() item: Item) {
        console.log('item', item);
        this.cart.add(item);
        return this.cart.get();
    }

    @Get()
    get() {
        return this.cart.get();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        const removeItem = this.cart.remove(id);
        return removeItem;
    }
}
