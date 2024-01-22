import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm';
import { IUserService } from 'src/users/user';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findUser({ id: user.id });

    return userDb ? done(null, user) : done(null, null);
  }
}
