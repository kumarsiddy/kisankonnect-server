import {HttpService, Injectable} from "@nestjs/common";
import {OTPResponse as OtpResponse} from "./otp.response";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class OTPService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
    }

    public async getOtp(mobile: string): Promise<OtpResponse> {
        return (await this.getOtpFromProvider(mobile));
    }

    public async validateOtp(mobile: string, otp: string): Promise<OtpResponse> {
        return (await this.verifyOtpFromProvider(mobile, otp));
    }

    public async resendOtp(mobile: string): Promise<OtpResponse> {
        return (await this.resendOtpFromProvider(mobile));
    }

    private async getOtpFromProvider(mobile: string): Promise<OtpResponse> {
        let otp = OTPService.generateOtp();
        const SEND_OTP_URL = `https://api.msg91.com/api/v5/otp?authkey=${this.configService.get('OTP_PROVIDER_KEY')}&mobile=91${mobile}&otp=${otp}`;
        return await this.makeCallToProviderWith(SEND_OTP_URL);
    }

    private async verifyOtpFromProvider(mobile: string, otp: string): Promise<OtpResponse> {
        const VERIFY_OTP_URL = `https://api.msg91.com/api/v5/otp/verify?mobile=91${mobile}&otp=${otp}&authkey=${this.configService.get('OTP_PROVIDER_KEY')}`;
        return await this.makeCallToProviderWith(VERIFY_OTP_URL);
    }

    private async resendOtpFromProvider(mobile: string): Promise<OtpResponse> {
        const RESEND_OTP_URL = `https://api.msg91.com/api/v5/otp/retry?mobile=91${mobile}&authkey=${this.configService.get('OTP_PROVIDER_KEY')}`;
        return await this.makeCallToProviderWith(RESEND_OTP_URL);
    }

    private static generateOtp(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }

    private async makeCallToProviderWith(url: string): Promise<OtpResponse> {
        const response = this.httpService.get(url).toPromise();
        const data = (await response).data;
        return new OtpResponse(data);
    }

}