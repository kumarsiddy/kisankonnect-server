import {Body, Controller, HttpCode, HttpStatus, Post, Request, UseFilters, UseGuards} from '@nestjs/common';
import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import {LocalAuthGuard} from './auth/local.strategy';
import {CreateUserDto} from './dto/user.dto';
import {MongoExceptionFilter} from './exceptionfilter/mongo.exception.filter';
import {PasswordNotMatchingException, UserNotRegisteredException} from './exceptionfilter/user.exception.filter';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
    }

    @UseGuards(LocalAuthGuard)
    @UseFilters(UserNotRegisteredException)
    @UseFilters(PasswordNotMatchingException)
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Request() req) {
        console.log(req.user);
        return await this.authService.createAccessToken(req.user);
    }

    @UseFilters(MongoExceptionFilter)
    @Post('signup')
    @HttpCode(HttpStatus.OK)
    async createUser(@Body() createUserDto: CreateUserDto) {
        let user = await this.userService.create(createUserDto);
        return await this.authService.createAccessToken(user);
    }
}
  