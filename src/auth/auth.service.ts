import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { UserCredentialDetails } from 'src/utils/types';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/user';
import { compareHash } from 'src/utils/helpers';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private userService: IUserService) {}

  async validateUser(userCredentialDetails: UserCredentialDetails) {
    const user = await this.userService.findUser({
      email: userCredentialDetails.email,
    });

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = compareHash(
      userCredentialDetails.password,
      user.password,
    );

    return isPasswordValid ? user : null;
  }
}
