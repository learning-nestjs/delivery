import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class ConfigService {
    abstract hello(): string;
}