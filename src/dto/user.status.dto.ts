import {ScreenType} from "../status/screentype";

export class UserStatusDto {
    userId: number;
    name: string;
    mobile: string;
    email: string;
    isMobileVerified: boolean;
    isEmailVerified: boolean;
    screenTypeToOpen: ScreenType;

    constructor(
        userId?: number,
        name?: string,
        mobile?: string,
        email?: string,
        isMobileVerified?: boolean,
        isEmailVerified?: boolean,
        screenTypeToOpen?: ScreenType,
    ) {
        this.userId = userId;
        this.name = name;
        this.mobile = mobile;
        this.email = email;
        this.isMobileVerified = isMobileVerified;
        this.isEmailVerified = isEmailVerified;
        this.screenTypeToOpen = screenTypeToOpen;
    }

}