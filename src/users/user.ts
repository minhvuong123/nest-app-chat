import { CreateUserDetails } from 'src/utils/types';

export interface IUserInterface {
  createUser(userDetails: CreateUserDetails);
}
