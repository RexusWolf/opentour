import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { CompetitionDTO } from '@opentour/contracts';
import React from 'react';
import { useStyles } from '../theme';

import { CompetitionRow } from './competitionRow/competitionRow';

type Props = {
  competitions: CompetitionDTO[];
};

export const CompetitionsList: React.FunctionComponent<Props> = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="40%">Name</TableCell>
            <TableCell width="20%" align="center">
              Sport
            </TableCell>
            <TableCell width="20%" align="center">
              Type
            </TableCell>
            <TableCell width="20%"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.competitions &&
            props.competitions.map((competition, index) => (
              <CompetitionRow key={index} competition={competition} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
