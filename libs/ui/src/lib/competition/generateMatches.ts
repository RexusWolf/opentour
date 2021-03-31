import { Match } from '../calendarMatch.tsx/calendarMatch';
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
        date: { day: 'Mar, 9/3', hour: '21:00' },
      })
    );
  });
  return matches;
}
