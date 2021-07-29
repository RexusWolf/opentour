export class CompetitionDTO {
  id: string;
  name: string;
  type: string;
  sportName: string;
  moderatorIds: string[];
  hasStarted: boolean;
  currentJourney?: string;
  scoreSystem: CompetitionScoreSystem;

  static empty(): CompetitionDTO {
    return {
      id: '',
      name: '',
      type: '',
      sportName: '',
      moderatorIds: [],
      hasStarted: false,
      currentJourney: undefined,
      scoreSystem: {
        victory: 0,
        tie: 0,
        defeat: 0,
      },
    };
  }
}

export type CompetitionScoreSystem = {
  victory: number;
  tie: number;
  defeat: number;
};
