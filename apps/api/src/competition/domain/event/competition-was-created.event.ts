import { StorableEvent } from 'event-sourcing-nestjs';

export class CompetitionWasCreated extends StorableEvent {
  eventAggregate = 'competition';
  eventVersion = 1;

  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly sportName: string;
  readonly moderatorId: string;
  readonly scoreSystem: {
    victory: number;
    tie: number;
    defeat: number;
  };

  constructor(params: {
    id: string;
    name: string;
    type: string;
    sportName: string;
    moderatorId: string;
    scoreSystem: {
      victory: number;
      tie: number;
      defeat: number;
    };
  }) {
    super();
    this.id = params.id;
    this.name = params.name;
    this.type = params.type;
    this.sportName = params.sportName;
    this.moderatorId = params.moderatorId;
    this.scoreSystem = params.scoreSystem;
  }
}
