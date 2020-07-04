import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Gender} from "./gender";
import {Role} from "../auth/role";

@Schema()
export class User extends Document {
    @Prop({
        required: true,
        unique: true,
    })
    userId: number;

    @Prop({
        default: [Role.CUSTOMER],
    })
    roles: Role[];

    @Prop()
    name: string;

    @Prop({
        required: true,
        type: Gender,
    })
    gender: Gender;

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        default: false
    })
    isEmailVerified: boolean;

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    mobile: string;

    @Prop({
        default: false
    })
    isMobileVerified: boolean;

    @Prop({
        type: String,
        required: true,
    })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);