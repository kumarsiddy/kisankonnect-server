import {Injectable} from "@nestjs/common";
import * as SERVICEABLE_LIST from '../data/serviceable.json'

@Injectable()
export class ServiceabilityService {

    async getServiceableList() {
        return SERVICEABLE_LIST;
    }

    async getServiceablePincodes() {
        return SERVICEABLE_LIST.pincodes;
    }

    async isPincodeServiceable(pincode: string) {
        return SERVICEABLE_LIST.pincodes.includes(pincode);
    }
}