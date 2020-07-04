import {Module} from "@nestjs/common";
import {AutoIncrementModule} from "../autoincrement/autoincrement.module";
import {ConfigModule} from "@nestjs/config";
import {EdibleController} from "./edible.controller";
import {EdibleService} from "./edible.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Edible, EdibleSchema} from "./edible.schema";

@Module({
    imports: [
        ConfigModule,
        AutoIncrementModule,
        MongooseModule.forFeature([{
            name: Edible.name,
            schema: EdibleSchema,
        }]),
    ],
    providers: [
        EdibleService,
    ],
    controllers: [
        EdibleController,
    ],
    exports: [
        EdibleService,
    ]
})
export class EdibleModule {

}