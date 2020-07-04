import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {AutoIncrement, AutoIncrementSchema} from "./autoincrement.schema";
import {AutoincrementService} from "./autoincrement.service";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: AutoIncrement.name,
            schema: AutoIncrementSchema
        }])
    ],
    providers: [AutoincrementService],
    exports: [AutoincrementService],
})
export class AutoIncrementModule {
}