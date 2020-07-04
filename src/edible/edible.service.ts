import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ConfigService} from "@nestjs/config";
import {AutoincrementService} from "../autoincrement/autoincrement.service";
import {Edible} from "./edible.schema";

@Injectable()
export class EdibleService {
    constructor(
        @InjectModel(Edible.name) private readonly edibleRepo: Model<Edible>,
        private readonly configService: ConfigService,
        private readonly autoincrementService: AutoincrementService,
    ) {
    }

    async getAll() {
        return this.edibleRepo.find();
    }

    async addEdible(edible: Edible) {
        let edibleId: number = (await this.autoincrementService.getRecentEdibleId()) + 1;
        const edibleToBeCreated = new this.edibleRepo({
            edibleId: edibleId,
            name: edible.name,
            type: edible.type,
            quantity: edible.quantity,
            isInMilliliter: edible.isInMilliliter,
            price: edible.price,
        });
        let newEdible = await edibleToBeCreated.save();
        await this.autoincrementService.saveEdibleId(edibleId);
        return newEdible;
    }
}