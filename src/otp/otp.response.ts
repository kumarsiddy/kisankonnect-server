export class OTPResponse {
    public static SUCCESS = 'success';
    public static FAILURE = 'failure';
    public static OTP_NOT_MATCHED = 'OTP not match';
    public static OTP_INVALID = 'invalid_otp';
    public static ERROR = 'error';

    message: string;
    type: string;

    constructor(response?: any) {
        this.message = response && response.message;
        this.type = response && response.type;
    }

    public isSuccess(): boolean {
        return this.type == OTPResponse.SUCCESS;
    }

    public isOtpNotValid(): boolean {
        return this.type == OTPResponse.ERROR &&
            (this.message == OTPResponse.OTP_NOT_MATCHED
                || this.message == OTPResponse.OTP_INVALID);
    }
}