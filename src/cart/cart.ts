import { Injectable, NotFoundException } from "@nestjs/common";
import { Sequence } from "./sequence";
import { Item } from "./item.model";

@Injectable()
export class Cart {

    private orders = new Map<string, Item>();
    private total: number = 0.0;
    constructor(private sequence: Sequence) { }

    add(item: Item) {
        const itemKey = this.sequence.generate(item.id);
        const newItem = new Item(itemKey, item.price, 1, this.amount(item));
        const currentItem = this.orders.get(itemKey);
        this.total += newItem.amount;
        if (!currentItem) {
            this.orders.set(itemKey, newItem);
            return;
        }
        currentItem.qauntity += 1;
        currentItem.amount = this.amount(currentItem);
        this.orders.set(itemKey, currentItem);
    }

    remove(key: string): Item {
        const currentItem = this.orders.get(key);
        if (!currentItem) {
            throw new NotFoundException();
        }
        this.total -= currentItem.amount;
        this.orders.delete(key);
        return currentItem;
    }

    get(): object {
        const result: Item[] = [];
        this.orders.forEach((value, key) => {
            result.push(value);
        });
        return {
            items: result,
            total: this.total
        };
    }

    private amount(item: Item): number {
        if (!item.qauntity) {
            return item.price;
        }
        return item.qauntity * item.price;
    }
}