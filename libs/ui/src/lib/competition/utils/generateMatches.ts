import { CreateMatchDTO, CreateTeamDTO, TeamDTO } from '@opentour/contracts';
import { match } from 'assert';
import { v4 as uuid } from 'uuid';

import { doRequest } from '../../utils/doRequest';

export async function generateMatches(
  teams: TeamDTO[],
  competitionId: string,
  competitionType: string
): Promise<void> {
  const matches =
    competitionType === 'LIGA'
      ? generateLeagueMatches(teams, competitionId)
      : generateTournamentMatches(teams, competitionId);

  const requests = matches.map((match) => createMatch(match));
  await Promise.all(requests);
}

function getStartingRound(numberOfTeams: number) {
  if (numberOfTeams > 16) return 'Dieciseisavos';
  if (numberOfTeams > 8) return 'Octavos';
  if (numberOfTeams > 4) return 'Cuartos';
  if (numberOfTeams > 2) return 'Semifinal';
  return 'Final';
}

export function generateLeagueMatches(
  teams: TeamDTO[],
  competitionId: string
): CreateMatchDTO[] {
  let matchIndex = 0;

  const matches: CreateMatchDTO[] = [];
  teams.map((localTeam, firstIndex) => {
    const restOfTeams = teams.filter(
      (value, index) => value.id !== localTeam.id
    );
    restOfTeams.map((visitorTeam, secondIndex) => {
      const match = {
        id: uuid(),
        competitionId: competitionId,
        localTeamId: localTeam.id,
        visitorTeamId: visitorTeam.id,
        index: matchIndex++,
        journey: '-',
      };
      matches.push(match);
    });
  });
  return matches;
}

export function generateTournamentMatches(
  teams: TeamDTO[],
  competitionId: string
): CreateMatchDTO[] {
  const startingRound = getStartingRound(teams.length);
  const matchesForRound = createMatchesForRound(startingRound);
  const numberOfTeamsClassified = getNumberOfClassifiedTeams(
    teams.length,
    startingRound
  );

  const teamsNotClassified = teams.slice(
    0,
    teams.length - numberOfTeamsClassified
  );
  const teamsClassified = teams.slice(teams.length - numberOfTeamsClassified);

  const teamPairs = getTeamPairs(teamsNotClassified);

  const eightFinalMatches: CreateMatchDTO[] =
    matchesForRound.Octavos === true
      ? startingRound === 'Octavos'
        ? generateMatchesForJourney({
            teamPairs,
            competitionId,
            journey: 'Octavos',
          })
        : generateEmptyMatchesForJourney({
            competitionId,
            journey: 'Octavos',
            numberOfMatches: 8,
          })
      : [];

  const quarterFinalMatches: CreateMatchDTO[] =
    matchesForRound.Cuartos === true
      ? startingRound === 'Cuartos'
        ? generateMatchesForJourney({
            teamPairs,
            competitionId,
            journey: 'Cuartos',
          })
        : generateEmptyMatchesForJourney({
            competitionId,
            journey: 'Cuartos',
            numberOfMatches: 4,
          })
      : [];

  const semifinalMatches =
    matchesForRound.Semifinal === true
      ? startingRound === 'Semifinal'
        ? generateMatchesForJourney({
            teamPairs,
            competitionId,
            journey: 'Semifinal',
          })
        : generateEmptyMatchesForJourney({
            competitionId,
            journey: 'Semifinal',
            numberOfMatches: 2,
          })
      : [];

  const finalMatch =
    startingRound === 'Final'
      ? generateMatchesForJourney({
          teamPairs,
          competitionId,
          journey: 'Final',
        })
      : generateEmptyMatchesForJourney({
          competitionId,
          journey: 'Final',
          numberOfMatches: 1,
        });

  const matches = eightFinalMatches.concat(
    quarterFinalMatches.concat(semifinalMatches).concat(finalMatch)
  );

  teamsClassified.length &&
    updateNextRoundMatchesWithTeams(startingRound, matches, teamsClassified);

  return eightFinalMatches.concat(
    quarterFinalMatches.concat(semifinalMatches).concat(finalMatch)
  );
}

function getNumberOfClassifiedTeams(
  numberOfTeams: number,
  startingRound: string
) {
  if (startingRound === 'Dieciseisavos') return 32 - numberOfTeams;
  if (startingRound === 'Octavos') return 16 - numberOfTeams;
  if (startingRound === 'Cuartos') return 8 - numberOfTeams;
  if (startingRound === 'Semifinal') return 4 - numberOfTeams;
  return 0;
}

function updateNextRoundMatchesWithTeams(
  startingRound: string,
  matches: CreateMatchDTO[],
  teamsClassified: TeamDTO[]
) {
  const nextJourney = getNextJourney(startingRound);

  const nextJourneyMatches = matches.filter(
    (match) => match.journey === nextJourney
  );
  for (let index = 1; index <= teamsClassified.length; index++) {
    const matchForClassifiedTeamIndex =
      index === nextJourneyMatches.length
        ? 0
        : nextJourneyMatches.length - (index % nextJourneyMatches.length);

    index <= nextJourneyMatches.length
      ? (nextJourneyMatches[matchForClassifiedTeamIndex].visitorTeamId =
          teamsClassified[index - 1].id)
      : (nextJourneyMatches[matchForClassifiedTeamIndex].localTeamId =
          teamsClassified[index - 1].id);
  }
}

function getNextJourney(journey: string) {
  if (journey === 'Dieciseisavos') return 'Octavos';
  if (journey === 'Octavos') return 'Cuartos';
  if (journey === 'Cuartos') return 'Semifinal';
  if (journey === 'Semifinal') return 'Final';
}

function getTeamPairs(teamsArray: TeamDTO[]) {
  const results: TeamDTO[][] = [];

  while (teamsArray.length) {
    results.push(teamsArray.splice(0, 2));
  }

  return results;
}

function createMatchesForRound(startingRound: string) {
  const createForRound = {
    Dieciseisavos: true,
    Octavos: true,
    Cuartos: true,
    Semifinal: true,
    Final: true,
  };

  if (startingRound === 'Octavos') createForRound.Dieciseisavos = false;
  if (startingRound === 'Cuartos') {
    createForRound.Dieciseisavos = false;
    createForRound.Octavos = false;
  }
  if (startingRound === 'Semifinal') {
    createForRound.Dieciseisavos = false;
    createForRound.Octavos = false;
    createForRound.Cuartos = false;
  }
  if (startingRound === 'Final') {
    createForRound.Dieciseisavos = false;
    createForRound.Octavos = false;
    createForRound.Cuartos = false;
    createForRound.Semifinal = false;
  }
  return createForRound;
}

function generateMatchesForJourney(params: {
  teamPairs: TeamDTO[][];
  competitionId: string;
  journey: string;
}): CreateMatchDTO[] {
  const { teamPairs, competitionId, journey } = params;

  return teamPairs.map((teamPair, index) => ({
    id: uuid(),
    competitionId,
    index,
    localTeamId: teamPair[0].id,
    visitorTeamId: teamPair[1].id,
    journey,
  }));
}

function generateEmptyMatchesForJourney(params: {
  competitionId: string;
  journey: string;
  numberOfMatches: number;
}): CreateMatchDTO[] {
  const { competitionId, journey, numberOfMatches } = params;
  const quarterFinalMatches: CreateMatchDTO[] = [];
  for (let matchIndex = 0; matchIndex < numberOfMatches; matchIndex++) {
    const match = {
      id: uuid(),
      competitionId,
      index: matchIndex,
      journey,
    };
    quarterFinalMatches.push(match);
  }
  return quarterFinalMatches;
}

async function createMatch(createMatchDTO: CreateMatchDTO) {
  doRequest({
    method: 'POST',
    url: '/matches',
    data: {
      id: uuid(),
      competitionId: createMatchDTO.competitionId,
      localTeamId: createMatchDTO.localTeamId,
      visitorTeamId: createMatchDTO.visitorTeamId,
      index: createMatchDTO.index,
      journey: createMatchDTO.journey,
    },
  });
}
