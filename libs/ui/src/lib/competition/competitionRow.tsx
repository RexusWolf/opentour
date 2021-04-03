import { Button, Grid, Icon, Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import React from 'react';

import { useStyles } from '../theme';
import { Competition } from './competitions';

export type Props = {
  competition: Competition;
};

export const CompetitionRow: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { name, sport, numberOfTeams } = props.competition;

  return (
    <TableRow key={name}>
      <TableCell width="40%" component="th" scope="row">
        <Typography>{name}</Typography>
      </TableCell>
      <TableCell width="20%" align="center">
        <Grid item container justify="center" alignItems="center">
          {sport === 'Football' && <SportsSoccerIcon />}
          {sport === 'Basketball' && <SportsBasketballIcon />}
          {sport === 'Voleyball' && <SportsVolleyballIcon />}
          <Typography className={classes.containerItem}>{sport}</Typography>
        </Grid>
      </TableCell>
      <TableCell width="20%" align="center">
        {numberOfTeams}
      </TableCell>
      <TableCell width="20%" align="center">
        <Button variant="contained" color="primary">
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};
