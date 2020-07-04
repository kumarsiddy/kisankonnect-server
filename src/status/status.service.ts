import {Injectable} from "@nestjs/common";
import {User} from "src/user/user.schema";
import {UserStatusDto} from "src/dto/user.status.dto";
import {ScreenType} from "./screentype";
import {UserService} from "../user/user.service";

@Injectable()
export class StatusService {

    constructor(private readonly userService: UserService) {
    }

    async getStatus(userId: number) {
        let user: User = await this.userService.findByUserId(userId);
        return new UserStatusDto(
            user.userId,
            user.name,
            user.mobile,
            user.email,
            user.isMobileVerified,
            user.isEmailVerified,
            StatusService.getScreenTypeToOpen(user)
        );
    }

    private static getScreenTypeToOpen(user: User): ScreenType {
        if (!user.isMobileVerified) {
            return ScreenType.MOBILE_VERIFICATION;
        }
        return ScreenType.DASHBOARD;
    }
}