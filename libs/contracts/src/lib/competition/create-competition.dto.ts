export class CreateCompetitionDTO {
  id: string;
  name: string;
  type: string;
  sportName: string;
  scoreSystem: {
    victory: number;
    tie: number;
    defeat: number;
  };
}
