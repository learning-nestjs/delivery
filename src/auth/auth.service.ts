import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthCredentailDto } from './dto/auth-credential.dto';
import { User } from './user.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService) { }

    async signup(authCredentailDto: AuthCredentailDto): Promise<User> {
        const createdUser = new this.userModel(authCredentailDto);
        return createdUser.save();
    }

    async signin(authCredentailDto: AuthCredentailDto): Promise<{ accessToken: string }> {
        const { username } = authCredentailDto;
        const userInfo = await this.userModel.findOne({ username });
        if (!username) {
            throw new UnauthorizedException('Invalid Credentail.');
        }
        const payload = { username: userInfo.username, roles: userInfo.roles }
        console.log('payload, payload', payload);
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}
