import {HttpModule, Module} from "@nestjs/common";
import {OTPService} from "./otp.service";
import {HttpConfigService} from "src/config/app/config.http";

@Module({
    imports: [HttpModule.registerAsync({
        useClass: HttpConfigService
    })],
    providers: [OTPService],
    exports: [OTPService],
})
export class OTPModule {
}