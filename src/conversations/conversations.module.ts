import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Participant } from 'src/utils/typeorm';
import { ParticipantsModule } from 'src/participants/participants.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ParticipantsModule,
    UsersModule,
    TypeOrmModule.forFeature([Conversation, Participant]),
  ],
  controllers: [ConversationsController],
  providers: [
    {
      provide: Services.CONVERSTIONS,
      useClass: ConversationsService,
    },
  ],
})
export class ConversationsModule {}
