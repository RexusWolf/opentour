import { Icon } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import React from 'react';
import { useStyles } from '../../../theme';

import { TeamSlot } from '../../shared/teamSlot/teamSlot';
import { getRandomLogo } from '../../utils/getRandomLogo';
import { RankingTeam } from '../ranking';

export type Props = {
  team: RankingTeam;
};

export const TeamRankingRow: React.FunctionComponent<Props> = ({ team }) => {
  const classes = useStyles();
  return (
    <TableRow key={team.name}>
      <TableCell component="th" scope="row">
        <TeamSlot name={team.name} logo={getRandomLogo()} />
      </TableCell>
      <TableCell width="5%" align="right">
        {team.matchPlayeds}
      </TableCell>
      <TableCell width="5%" align="right">
        {team.victories}
      </TableCell>
      <TableCell width="5%" align="right">
        {team.ties}
      </TableCell>
      <TableCell width="5%" align="right">
        {team.defeats}
      </TableCell>
      <TableCell width="5%" align="right">
        {team.points}
      </TableCell>
      <TableCell width="10%" align="right">
        {team.lastFive.map((matchResult, index) => {
          return matchResult === 'victory' ? (
            <Icon key={index} className={classes.greenColor}>
              <CheckCircle />
            </Icon>
          ) : matchResult === 'defeat' ? (
            <Icon key={index} color="error">
              <CancelIcon />
            </Icon>
          ) : (
            <Icon key={index} color="disabled">
              <RemoveCircle />
            </Icon>
          );
        })}
      </TableCell>
    </TableRow>
  );
};
