import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { MongoError } from 'mongodb';
import { Response } from 'express';
import { ServerMessage } from "src/config/app/config.message";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {

    catch(exception: MongoError, host: ArgumentsHost) {
        switch (exception.code) {
            case 11000:
                const ctx = host.switchToHttp();
                const response = ctx.getResponse<Response>();
                response.statusCode = HttpStatus.FORBIDDEN;
                response
                    .json({
                        statusCode: HttpStatus.FORBIDDEN,
                        timestamp: new Date().toISOString(),
                        message: ServerMessage.DUPLICATE_USER_ERROR,
                    });
        }
    }
}