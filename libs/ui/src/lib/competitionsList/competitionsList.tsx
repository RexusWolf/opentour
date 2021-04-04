import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';

import { Competition } from '../shared/Competition';
import { CompetitionRow } from './competitionRow/competitionRow';

export type Props = {
  competitions: Competition[];
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
              Number of Teams
            </TableCell>
            <TableCell width="20%"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.competitions.map((competition, index) => (
            <CompetitionRow key={index} competition={competition} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
