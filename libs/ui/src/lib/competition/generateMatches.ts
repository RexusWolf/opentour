import { Props as Match } from '../calendar/calendarMatch';
import { Team } from './teams';

export function generateMatches(teams: Team[]): Match[] {
  const matches: Match[] = [];
  teams.map((localTeam) => {
    const restOfTeams = teams.filter((value, index) => value !== localTeam);
    restOfTeams.map((visitorTeam) =>
      matches.push({
        localTeam,
        visitorTeam,
        isScheduled: localTeam.id > visitorTeam.id,
        date: new Date(),
        result: { localTeam: 0, visitorTeam: 0 },
      })
    );
  });
  return matches;
}
