import { Icon } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckCircle from '@material-ui/icons/CheckCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import React from 'react';

import { TeamStatistics } from '../competition/ranking';
import { TeamSlot } from '../teamSlot/teamSlot';

type Props = {
  team: TeamStatistics;
};

export const TeamRankingRow: React.FunctionComponent<Props> = (props) => {
  return (
    <TableRow key={props.team.name}>
      <TableCell component="th" scope="row">
        <TeamSlot name={props.team.name} logo={props.team.logo} />
      </TableCell>
      <TableCell width="5%" align="right">
        {props.team.pj}
      </TableCell>
      <TableCell width="5%" align="right">
        {props.team.v}
      </TableCell>
      <TableCell width="5%" align="right">
        {props.team.e}
      </TableCell>
      <TableCell width="5%" align="right">
        {props.team.d}
      </TableCell>
      <TableCell width="5%" align="right">
        {props.team.pts}
      </TableCell>
      <TableCell width="10%" align="right">
        {props.team.lastFive.map((matchResult, index) => {
          return matchResult === 'victory' ? (
            <Icon key={index} color="secondary">
              <CheckCircle />
            </Icon>
          ) : matchResult === 'defeat' ? (
            <Icon key={index} color="error">
              <CheckCircle />
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
