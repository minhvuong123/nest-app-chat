import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/createUser.dto';
import { IUserService } from 'src/users/user';
import { instanceToPlain } from 'class-transformer';
import { AuthenticateGuard, LocalAuthGuard } from './utils/guards';
import { Response } from 'express';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() response: Response) {
    return response.sendStatus(HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(AuthenticateGuard)
  status(@Req() req: Request, @Res() response: Response) {
    console.log('auth login');
    response.send(req['user']);
  }

  @Get('logout')
  logout() {}
}
