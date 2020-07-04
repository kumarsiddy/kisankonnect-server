import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema({capped: {size: 1024, max: 1, autoIndexId: true}})
export class AutoIncrement extends Document {

    @Prop({
        default: 0
    })
    docId: number;

    @Prop()
    userId: number;

    @Prop()
    edibleId: number;
}

export const AutoIncrementSchema = SchemaFactory.createForClass(AutoIncrement);
