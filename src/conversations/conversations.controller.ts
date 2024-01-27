import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticateGuard } from 'src/auth/utils/guards';
import { Routes, Services } from 'src/utils/constants';
import { IConversationService } from './conversations';
import { CreateConversationDto } from './dtos/createConversation.dto';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IUserService } from 'src/users/user';

@Controller(Routes.CONVERSTIONS)
@UseGuards(AuthenticateGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSTIONS)
    private readonly conversationsService: IConversationService,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createCovnersationPayload: CreateConversationDto,
  ) {
    console.log('conversation:', user);
    const userDB = await this.userService.findUser({ id: user.id });
    return this.conversationsService.createConversation(
      userDB,
      createCovnersationPayload,
    );
  }
}
