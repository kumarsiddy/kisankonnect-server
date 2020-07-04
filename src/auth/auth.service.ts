import {Injectable} from '@nestjs/common';
import {UserService} from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt';
import {User} from 'src/user/user.schema';
import {PasswordNotMatchingException, UserNotRegisteredException} from "../exceptionfilter/user.exception.filter";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    public async validateUser(username: string, password: string): Promise<User> {
        let user = null;

        if (username.includes('@')) {
            user = await this.userService.findByEmail(username);
        } else {
            user = await this.userService.findByMobile(username);
        }

        if (!user) {
            throw new UserNotRegisteredException();
        }

        const bcrypt = require('bcrypt');
        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (isPasswordMatching) {
            return user;
        }
        throw  new PasswordNotMatchingException();
    }

    public async createAccessToken(user: User): Promise<any | { status: number }> {
        const payload = {
            userId: user.userId,
            roles: user.roles,
        };
        const accessToken = this.jwtService.sign(payload);
        return {
            token: accessToken,
        };
    }
}