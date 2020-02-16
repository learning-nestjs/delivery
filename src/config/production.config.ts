import { ConfigService } from './config.service';

export class ProductionConfigService extends ConfigService {
    hello(): string {
        return 'hello production service';
    }
}