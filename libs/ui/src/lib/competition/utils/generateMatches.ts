import { TeamDTO } from '@opentour/contracts';
import { v4 as uuid } from 'uuid';

import { doRequest } from '../../utils/doRequest';

// const journeys = [
//   'Sesentaicuatroavos',
//   'Treintaidosavos',
//   'Dieciseisavos',
//   'Octavos',
//   'Cuartos',
//   'Semifinales',
//   'Final',
// ];

export async function generateMatches(
  teams: TeamDTO[],
  competitionId: string
): Promise<void> {
  let matchIndex = 1;
  const requests = teams.map((localTeam, firstIndex) => {
    const restOfTeams = teams.filter(
      (value, index) => value.id !== localTeam.id
    );
    return restOfTeams.map((visitorTeam, secondIndex) =>
      doRequest({
        method: 'POST',
        url: '/matches',
        data: {
          id: uuid(),
          competitionId: competitionId,
          localTeamId: localTeam.id,
          visitorTeamId: visitorTeam.id,
          index: matchIndex++,
          journey: '-',
        },
      })
    );
  });

  Promise.all(requests);
}
