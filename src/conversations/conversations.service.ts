import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IConversationService } from './conversations';
import { CreateConversationParams } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Participant, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IParticipantsService } from 'src/participants/participants';
import { IUserService } from 'src/users/user';

@Injectable()
export class ConversationsService implements IConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRespository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS)
    private readonly participantsService: IParticipantsService,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}
  async createConversation(user: User, params: CreateConversationParams) {
    const participants: Participant[] = [];
    const userDB = await this.userService.findUser({ id: user.id });

    if (!user.participant) {
      const participant = await this.createParticipantAndSaveUser(
        userDB,
        params.authorId,
      );

      participants.push(participant);
    } else {
      participants.push(userDB.participant);
    }

    const recipient = await this.userService.findUser({
      id: params.recipientId,
    });

    if (!recipient) {
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);
    }

    if (!recipient.participant) {
      const participant = await this.createParticipantAndSaveUser(
        recipient,
        params.recipientId,
      );
      participants.push(participant);
    } else {
      participants.push(recipient.participant);
    }

    const conversation = this.conversationRespository.create({
      participants,
    });

    return this.conversationRespository.save(conversation);
  }

  private async createParticipantAndSaveUser(user: User, id: number) {
    const participant = await this.participantsService.createParticipant({
      id,
    });
    user.participant = participant;
    await this.userService.saveUser(user);
    return participant;
  }
}
