export class CompetitionDTO {
  id: string;
  name: string;
  type: string;
  sportName: string;
  moderatorIds: string[];
  hasStarted: boolean;
  scoreSystem: {
    victory: number;
    tie: number;
    defeat: number;
  };

  static empty(): CompetitionDTO {
    return {
      id: '',
      name: '',
      type: '',
      sportName: '',
      moderatorIds: [],
      hasStarted: false,
      scoreSystem: {
        victory: 0,
        tie: 0,
        defeat: 0,
      },
    };
  }
}
