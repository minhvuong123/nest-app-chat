import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/createUser.dto';
import { IUserInterface } from 'src/users/user';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserInterface,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    this.userService.createUser(createUserDto);
  }

  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Get('logout')
  logout() {}
}
