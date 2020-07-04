import {Gender} from "../user/gender";

export class CreateUserDto {
    readonly name: string;
    readonly gender: Gender;
    readonly email: string;
    readonly mobile: string;
    readonly password: string;
}

export class UpdateUserDto {
    userDetails: CreateUserDto;
}