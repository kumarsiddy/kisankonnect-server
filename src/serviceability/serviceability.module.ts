import {Module} from "@nestjs/common";
import {ServiceabilityController} from "./serviceability.controller";
import {ServiceabilityService} from "./serviceability.service";


@Module({
    imports: [],
    controllers: [ServiceabilityController],
    providers: [ServiceabilityService],
    exports: [ServiceabilityService],
})
export class ServiceabilityModule {

}
