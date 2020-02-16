import { ConfigService } from './config.service';

export class DevelopmentConfigService extends ConfigService {
    hello(): string {
        return 'hello development service';
    }

}