import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

import { TeamStatistics } from '../competition/ranking';
import { TeamRankingRow } from './teamRankingRow';

function getSortedRanking(ranking: TeamStatistics[]): TeamStatistics[] {
  return ranking.sort((a, b) => (a.pts < b.pts ? 1 : b.pts < a.pts ? -1 : 0));
}

export type Props = {
  ranking: TeamStatistics[];
};

export const Ranking: React.FunctionComponent<Props> = (props) => {
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
          {getSortedRanking(props.ranking).map((team) => (
            <TeamRankingRow key={team.id} team={team} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
