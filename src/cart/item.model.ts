export class Item {
    id: string;
    price: number;
    qauntity: number;
    amount: number;

    constructor(id: string, price: number, qauntity: number, amount: number) {
        this.id = id;
        this.price = price;
        this.qauntity = qauntity;
        this.amount = amount;
    }
}