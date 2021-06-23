import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { RankingDTO } from '@opentour/contracts';
import React from 'react';

import { TeamRankingRow } from './teamRankingRow/teamRankingRow';

function getSortedRanking(rankingTeams: RankingTeam[]): RankingTeam[] {
  return rankingTeams.sort((a, b) =>
    a.points < b.points ? 1 : b.points < a.points ? -1 : 0
  );
}

export type Props = {
  ranking: RankingDTO;
  scoreSystem: ScoreSystem;
};

export type RankingTeam = {
  name: string;
  logo: string;
  matchPlayeds: number;
  victories: number;
  ties: number;
  defeats: number;
  points: number;
  lastFive: string[];
};

export type ScoreSystem = { victory: number; tie: number; defeat: number };

function getRankingTeamsFromRanking(
  ranking: RankingDTO,
  scoreSystem: ScoreSystem
): RankingTeam[] {
  const rankingTeams: RankingTeam[] = [];
  for (const team of ranking.teams) {
    const matchPlayeds = team.matchesPlayed.length || 0;
    const victories = team.matchesPlayed.filter(
      (match) => match.result === 'victory'
    ).length;
    const ties = team.matchesPlayed.filter((match) => match.result === 'tie')
      .length;
    const defeats = team.matchesPlayed.filter(
      (match) => match.result === 'defeat'
    ).length;
    const points =
      victories * scoreSystem.victory +
      ties * scoreSystem.tie +
      defeats * scoreSystem.defeat;

    const sortedMatches = team.matchesPlayed.sort((a, b) =>
      a.index > b.index ? 1 : b.index < a.index ? -1 : 0
    );

    const lastFive = sortedMatches.slice(0, 5).map((match) => match.result);

    const rankingTeam = {
      name: team.name,
      logo: team.logo,
      matchPlayeds,
      victories,
      ties,
      defeats,
      points,
      lastFive,
    };
    rankingTeams.push(rankingTeam);
  }

  return rankingTeams;
}

export const Ranking: React.FunctionComponent<Props> = ({
  ranking,
  scoreSystem,
}) => {
  const rankingTeams = ranking
    ? getRankingTeamsFromRanking(ranking, scoreSystem)
    : null;
  const statistics = ['PJ', 'V', 'E', 'D', 'Pts', 'Últimos 5'];
  return (
    <>
      {rankingTeams ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Club</TableCell>
                {statistics.map((statistic, index) => (
                  <TableCell key={index} align="right">
                    {statistic}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ranking &&
                getSortedRanking(rankingTeams).map((team) => (
                  <TeamRankingRow key={team.name} team={team} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h4">Competition has not started</Typography>
      )}
    </>
  );
};
