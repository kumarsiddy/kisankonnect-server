import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpStatus,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import {Request, Response} from 'express';
import {ServerMessage} from "src/config/app/config.message";

@Catch(UserNotRegisteredException)
export class UserNotRegisteredException extends NotFoundException implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.statusCode = HttpStatus.NOT_FOUND;
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: ServerMessage.USER_NOT_REGISTERED
            });
    }

}

@Catch(OTPException)
export class OTPException extends BadRequestException implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.statusCode = HttpStatus.BAD_REQUEST;
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception.message,
            });
    }
}

@Catch(OtpNotValidException)
export class OtpNotValidException extends NotFoundException implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.statusCode = HttpStatus.NOT_ACCEPTABLE;
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: ServerMessage.OTP_NOT_VALID,
            });
    }
}

@Catch(PasswordNotMatchingException)
export class PasswordNotMatchingException extends UnauthorizedException implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.statusCode = HttpStatus.UNAUTHORIZED;
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: ServerMessage.PASSWORD_NOT_MATCHING,
            });
    }
}