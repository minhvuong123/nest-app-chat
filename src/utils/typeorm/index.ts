import { Conversation } from './entities/conversation';
import { Participant } from './entities/participant';
import { Session } from './entities/session';
import { User } from './entities/user';

const entities = [User, Session, Conversation, Participant];

export { User, Session, Conversation, Participant };

export default entities;
