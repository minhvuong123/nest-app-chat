import { Injectable } from '@nestjs/common';
import { IUserInterface } from './user';
import { CreateUserDetails } from 'src/utils/types';

@Injectable()
export class UserService implements IUserInterface {
  createUser(userDetails: CreateUserDetails) {
    console.log('user');
  }
}
