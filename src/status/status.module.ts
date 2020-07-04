import {HttpModule, Module} from "@nestjs/common";
import {HttpConfigService} from "src/config/app/config.http";
import {StatusService} from "./status.service";
import {StatusController} from "./status.controller";
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        HttpModule.registerAsync({
            useClass: HttpConfigService
        }),
        UserModule,
    ],
    providers: [StatusService],
    controllers: [StatusController],
    exports: [],
})
export class StatusModule {
}