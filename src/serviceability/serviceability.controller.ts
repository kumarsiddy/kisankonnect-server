import {Controller, Get, Query} from "@nestjs/common";
import {ServiceabilityService} from "./serviceability.service";
import {ServerMessage} from "../config/app/config.message";

@Controller('serviceable')
export class ServiceabilityController {
    constructor(private readonly serviceabilityService: ServiceabilityService) {
    }

    @Get('list')
    async getList() {
        return await this.serviceabilityService.getServiceableList();
    }

    @Get('pincodes')
    async getPincodes() {
        return await this.serviceabilityService.getServiceableList();
    }

    @Get('isPincodeServiceable')
    async isPincodeServiceable(@Query('pincode') pincode: string) {
        let isPincodeServiceable: boolean = await this.serviceabilityService.isPincodeServiceable(pincode);
        return {
            'message': isPincodeServiceable ? ServerMessage.PINCODE_SERVICEABLE : ServerMessage.PINCODE_NOT_SERVICEABLE,
            'isServiceable': isPincodeServiceable
        };
    }
}