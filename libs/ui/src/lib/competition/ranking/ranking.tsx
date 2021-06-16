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

export const Ranking: React.FunctionComponent<Props> = ({ ranking }) => {
  const statistics = ['PJ', 'V', 'E', 'D', 'Pts', 'Últimos 5'];
  return (
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
            getSortedRanking(ranking.teams).map((team) => (
              <TeamRankingRow key={team.name} team={team} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
