import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {User, UserSchema} from "./user.schema";
import {AutoIncrementModule} from "../autoincrement/autoincrement.module";
import {OTPModule} from "../otp/otp.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        AutoIncrementModule,
        OTPModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
}