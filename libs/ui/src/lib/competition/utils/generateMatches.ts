import { TeamDTO } from '@opentour/contracts';
import { v4 as uuid } from 'uuid';

import { doRequest } from '../../utils/doRequest';

export async function generateMatches(
  teams: TeamDTO[],
  competitionId: string
): Promise<void> {
  const requests = teams.map((localTeam) => {
    const restOfTeams = teams.filter(
      (value, index) => value.id !== localTeam.id
    );
    return restOfTeams.map((visitorTeam) =>
      doRequest({
        method: 'POST',
        url: '/matches',
        data: {
          id: uuid(),
          competitionId: competitionId,
          localTeamId: localTeam.id,
          visitorTeamId: visitorTeam.id,
          index: 0,
          journey: 'Cuartos',
        },
      })
    );
  });

  Promise.all(requests);
}
