import {Module} from '@nestjs/common';
import {UserModule} from 'src/user/user.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthService} from './auth.service';
import {LocalStrategy} from './local.strategy';
import {JwtStrategy} from './jwt.strategy';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: '30d',
                }
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}