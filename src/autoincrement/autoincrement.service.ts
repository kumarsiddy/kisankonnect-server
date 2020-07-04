import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ConfigService} from "@nestjs/config";
import {AutoIncrement} from "./autoincrement.schema";

@Injectable()
export class AutoincrementService {
    constructor(
        @InjectModel(AutoIncrement.name) private readonly autoIncrementRepo: Model<AutoIncrement>,
        private readonly configService: ConfigService,
    ) {
    }

    public async getRecentUserId() {
        return ((await this.getAutoIncrement()).userId);
    }

    public async getRecentEdibleId() {
        return ((await this.getAutoIncrement()).edibleId);
    }

    private async getAutoIncrement() {
        let autoIncrement: AutoIncrement = await this.autoIncrementRepo.findOne({docId: 0});
        // This will be called for the first time when data will be empty inside AutoIncrement Collection
        if (autoIncrement == null) {
            const autoIncrementTobeCreated = new this.autoIncrementRepo({
                userId: 0,
                edibleId: 0,
            });
            return autoIncrementTobeCreated.save();
        }
        return autoIncrement;
    }

    public async saveUserId(userId: number) {
        let autoIncrement: AutoIncrement = await this.getAutoIncrement();
        if (userId > autoIncrement.userId) {
            autoIncrement.userId = userId;
        }
        await autoIncrement.save();
    }

    async saveEdibleId(edibleId: number) {
        let autoIncrement: AutoIncrement = await this.getAutoIncrement();
        if (edibleId > autoIncrement.edibleId) {
            autoIncrement.edibleId = edibleId;
        }
        await autoIncrement.save();
    }
}