import { Button, Grid, Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import React from 'react';

import { CompetitionDTO } from '../../../../../contracts/src';
import { useStyles } from '../../theme';

export type Props = {
  competition: CompetitionDTO;
};

export const CompetitionRow: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const { id, name, type, sportName, moderatorIds } = props.competition;

  return (
    <TableRow key={name}>
      <TableCell width="40%" component="th" scope="row">
        <Typography>{name}</Typography>
      </TableCell>
      <TableCell width="20%" align="center">
        <Grid item container justify="center" alignItems="center">
          {sportName === 'Fútbol' && <SportsSoccerIcon />}
          {sportName === 'Baloncesto' && <SportsBasketballIcon />}
          {sportName === 'Voleibol' && <SportsVolleyballIcon />}
          <Typography className={classes.containerItem}>{sportName}</Typography>
        </Grid>
      </TableCell>
      <TableCell width="20%" align="center">
        {type}
      </TableCell>
      <TableCell width="20%" align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = '/competition/competition?id=' + id;
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};
