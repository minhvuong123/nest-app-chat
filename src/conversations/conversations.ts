import { User } from 'src/utils/typeorm';
import { CreateConversationParams } from 'src/utils/types';

export interface IConversationService {
  createConversation(
    user: User,
    createCovnersationParams: CreateConversationParams,
  );
}
