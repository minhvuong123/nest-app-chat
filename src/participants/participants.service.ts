import { Injectable } from '@nestjs/common';
import { IParticipantsService } from './participants';
import { Participant } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateParticipantParams,
  FindParticipantParams,
} from 'src/utils/types';

@Injectable()
export class ParticipantsService implements IParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,
  ) {}

  findParticipant(params: FindParticipantParams): Promise<Participant> {
    return this.participantsRepository.findOneBy(params);
  }

  createParticipant(params: CreateParticipantParams): Promise<Participant> {
    const participant = this.participantsRepository.create(params);

    return this.participantsRepository.save(participant);
  }
}
