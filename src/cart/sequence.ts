import { Injectable } from "@nestjs/common";

@Injectable()
export class Sequence {
    private value: number = 0;
    private currentId: string;

    generate(id: string): string {
        if (this.currentId != id) {
            ++this.value;
        }
        this.currentId = id;
        return id + this.value;
    }
}