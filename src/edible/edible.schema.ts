import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {EdibleType} from "./edible.type";

@Schema()
export class Edible extends Document {
    @Prop({
        unique: true,
        type: Number,
    })
    edibleId: number;

    @Prop({
        unique: true,
        type: String,
    })
    name: string;

    @Prop()
    type: EdibleType;

    @Prop()
    quantity: number;

    @Prop({
        default: false
    })
    isInMilliliter: boolean;

    @Prop()
    price: number;

    @Prop()
    thumbnailImage: string;

    @Prop()
    image: string;
}

export const EdibleSchema = SchemaFactory.createForClass(Edible);