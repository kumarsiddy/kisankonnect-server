import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {StatusService} from "./status.service";
import {User} from "src/user/user.schema";


@Controller('status')
export class StatusController {
    constructor(
        private statusService: StatusService,
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    getUserStatus(@Request() req) {
        let user: User = req.user;
        return this.statusService.getStatus(user.userId);
    }
}