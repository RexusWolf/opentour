import { TeamDTO } from '@opentour/contracts';
import { v4 as uuid } from 'uuid';

import { doRequest } from '../../utils/doRequest';

export async function generateMatches(
  teams: TeamDTO[],
  competitionId: string,
  competitionType: string
): Promise<void> {
  if (competitionType === 'LIGA') {
    generateLeagueMatches(teams, competitionId);
  }
  generateTournamentMatches(teams, competitionId);
}

async function generateTournamentMatches(
  teams: TeamDTO[],
  competitionId: string
) {
  let matchIndex = 1;

  const startingRound = getStartingRound(teams.length);

  const teamsChunks = chunkTeamsArray(teams, 2);

  const startingRoundMatches = teamsChunks.map((chunkTeams) =>
    doRequest({
      method: 'POST',
      url: '/matches',
      data: {
        id: uuid(),
        competitionId: competitionId,
        localTeamId: chunkTeams[0].id,
        visitorTeamId: chunkTeams[1].id,
        index: matchIndex++,
        journey: startingRound,
      },
    })
  );
  await Promise.all(startingRoundMatches);
  if (startingRound !== 'Final' && startingRound !== 'Semifinal') {
    const semifinalLastMatchIndex = await createSemifinalMatches(
      competitionId,
      matchIndex
    );
    await createFinalMatch(competitionId, semifinalLastMatchIndex);
    return;
  }
  if (startingRound !== 'Final') {
    await createFinalMatch(competitionId, matchIndex);
  }
}

async function createSemifinalMatches(
  competitionId: string,
  previousMatchIndex: number
) {
  await doRequest({
    method: 'POST',
    url: '/matches',
    data: {
      id: uuid(),
      competitionId,
      index: previousMatchIndex,
      journey: 'Final',
    },
  });
  await doRequest({
    method: 'POST',
    url: '/matches',
    data: {
      id: uuid(),
      competitionId,
      index: previousMatchIndex + 1,
      journey: 'Final',
    },
  });
  return previousMatchIndex + 2;
}

async function createFinalMatch(
  competitionId: string,
  previousMatchIndex: number
) {
  await doRequest({
    method: 'POST',
    url: '/matches',
    data: {
      id: uuid(),
      competitionId,
      index: previousMatchIndex,
      journey: 'Final',
    },
  });
}

function getStartingRound(numberOfTeams: number) {
  if (numberOfTeams > 16) return 'Dieciseisavos';
  if (numberOfTeams > 8) return 'Octavos';
  if (numberOfTeams > 4) return 'Cuartos';
  if (numberOfTeams > 2) return 'Semifinal';
  return 'Final';
}

function chunkTeamsArray(array: TeamDTO[], chunkSize: number) {
  const results: TeamDTO[][] = [];

  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }

  return results;
}

async function generateLeagueMatches(teams: TeamDTO[], competitionId: string) {
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

  await Promise.all(requests);
}
