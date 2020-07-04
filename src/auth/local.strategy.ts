import {Injectable} from '@nestjs/common';
import {Strategy} from 'passport-local';
import {AuthGuard, PassportStrategy} from '@nestjs/passport';
import {AuthService} from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super();
  }


  // This method is the signature for local auth. It means the signature of this method will be matched
  // with the local passsport auth strategy in order to recognise this method is used for local auth.
  async validate(username: string, password: string): Promise<any> {
    return await this.authService.validateUser(username, password);
  }
}

export class LocalAuthGuard extends AuthGuard('local') {
}