import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./user.schema";
import {CreateUserDto, UpdateUserDto} from "src/dto/user.dto";
import {ConfigService} from "@nestjs/config";
import {AutoincrementService} from "../autoincrement/autoincrement.service";
import {ServerMessage} from "../config/app/config.message";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userRepo: Model<User>,
        private readonly configService: ConfigService,
        private readonly autoincrementService: AutoincrementService,
    ) {
    }

    public async findByUserId(userId: number): Promise<User> {
        return this.userRepo.findOne({userId: userId});
    }

    public async findByEmail(email: string): Promise<User> {
        return this.userRepo.findOne({email: email});
    }

    public async findByMobile(mobile: string) {
        return this.userRepo.findOne({mobile: mobile});
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        let hashedPassword = await this.getHashedPassword(createUserDto.password);
        let userId: number = (await this.autoincrementService.getRecentUserId()) + 1;
        const userTobeCreated = new this.userRepo({
            userId: userId,
            name: createUserDto.name,
            gender: createUserDto.gender,
            email: createUserDto.email,
            password: hashedPassword,
            mobile: createUserDto.mobile
        });
        let user = await userTobeCreated.save();
        await this.autoincrementService.saveUserId(userId);
        return user;
    }

    private async getHashedPassword(password: string) {
        const bcrypt = require('bcrypt');
        let hashedPassword = null;
        hashedPassword = await bcrypt.hash(password, Number(this.configService.get('BCRYPT_SALT_COUNT')));
        return hashedPassword;
    }

    public async update(userId: number, updateUserDto: UpdateUserDto) {
        let userDetails = updateUserDto.userDetails;
        let user: User = await this.findByUserId(userId);

        if (user == null) throw new NotFoundException(ServerMessage.USER_NOT_FOUND);

        if (userDetails.name != null) {
            user.name = userDetails.name;
        }
        if (userDetails.email != null) {
            user.email = userDetails.email;
            user.isEmailVerified = false;
        }
        if (userDetails.mobile != null) {
            user.mobile = userDetails.mobile;
            user.isMobileVerified = false;
        }
        await user.save();
    }

    async updateOtpVerification(mobile: string) {
        let user = await this.findByMobile(mobile);
        user.isMobileVerified = true;
        await user.save();
    }
}