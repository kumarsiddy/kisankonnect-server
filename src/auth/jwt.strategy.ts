import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    // This is the method which will return the User object data after validation of jwt token
    // i.e: if UseGuards(JwtToken) will be applied @Req.user value will be {UserId: payload.userId}
    async validate(payload: any) {
        return {
            userId: payload.userId,
            roles: payload.roles,
        };
    }
}