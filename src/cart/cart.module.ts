import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { Item } from './item.model';
import { Cart } from './cart';
import { Sequence } from './sequence';

@Module({
  controllers: [CartController],
  providers: [Item, Cart, Sequence]
})
export class CartModule { }
