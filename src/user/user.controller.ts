import {Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseFilters, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateUserDto} from "../dto/user.dto";
import {User} from "./user.schema";
import {MongoExceptionFilter} from "../exceptionfilter/mongo.exception.filter";
import {OTPException, OtpNotValidException} from "../exceptionfilter/user.exception.filter";
import {OTPService} from "../otp/otp.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly otpService: OTPService,
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @UseFilters(MongoExceptionFilter)
    @Post('update')
    @HttpCode(HttpStatus.OK)
    async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
        let user: User = req.user;
        await this.userService.update(user.userId, updateUserDto);
        return {
            'message': 'success'
        };
    }

    @UseGuards(JwtAuthGuard)
    @UseFilters(OTPException)
    @Get('getOtp')
    async generateOTP(@Query('mobile') mobile: string) {
        let otpResponse = await this.otpService.getOtp(mobile);
        if (!otpResponse.isSuccess()) throw new OTPException(otpResponse.message);
        return otpResponse;
    }

    @UseGuards(JwtAuthGuard)
    @UseFilters(OtpNotValidException)
    @Get('validateOtp')
    async validateOTP(@Query('mobile') mobile: string, @Query('otp') otp: string) {
        let otpResponse = await this.otpService.validateOtp(mobile, otp);
        if (otpResponse.isSuccess()) {
            await this.userService.updateOtpVerification(mobile);
        } else throw new OTPException(otpResponse.message);
        return otpResponse;
    }

    @UseGuards(JwtAuthGuard)
    @UseFilters(OTPException)
    @Get('resendOtp')
    async resend(@Query('mobile') mobile: string) {
        let otpResponse = await this.otpService.resendOtp(mobile);
        if (!otpResponse.isSuccess()) throw new OTPException(otpResponse.message);
        return otpResponse;
    }
}