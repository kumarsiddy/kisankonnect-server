import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule, ConfigService} from '@nestjs/config'
import {OTPModule} from './otp/otp.module';
import {AutoIncrementModule} from "./autoincrement/autoincrement.module";
import {StatusModule} from "./status/status.module";
import {ServiceabilityModule} from "./serviceability/serviceability.module";
import {EdibleModule} from "./edible/edible.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('DB_URL'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                autoIndex: true,
            }),
            inject: [ConfigService],
        }),
        AutoIncrementModule,
        UserModule,
        AuthModule,
        OTPModule,
        StatusModule,
        ServiceabilityModule,
        EdibleModule,
    ],
    controllers: [AppController],
})
export class AppModule {
}