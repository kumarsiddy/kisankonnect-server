import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {EdibleService} from "./edible.service";
import {Roles} from "../auth/roles.decorator";
import {Role} from "../auth/role";
import {RolesGuard} from "../auth/roles.guard";
import {Edible} from "./edible.schema";

@Controller('edible')
export class EdibleController {

    constructor(private readonly edibleService: EdibleService) {
    }

    @Get('getAll')
    @UseGuards(JwtAuthGuard)
    async getAllEdibles(@Req() req) {
        return this.edibleService.getAll();
    }

    @Post('add')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async addEdible(@Body() edible: Edible) {
        return this.edibleService.addEdible(edible);
    }

}