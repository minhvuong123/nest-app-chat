import { Participant } from 'src/utils/typeorm';
import {
  CreateParticipantParams,
  FindParticipantParams,
} from 'src/utils/types';

export interface IParticipantsService {
  findParticipant(param: FindParticipantParams): Promise<Participant>;

  createParticipant(params: CreateParticipantParams): Promise<Participant>;
}
