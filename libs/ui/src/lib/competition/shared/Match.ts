import { Team } from './Team';

export type Match = {
  localTeam: Team;
  visitorTeam: Team;
  isScheduled: boolean;
  date: Date;
  result: { localTeam: number; visitorTeam: number };
};
