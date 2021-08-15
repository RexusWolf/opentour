import { Button, Grid, Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import { CompetitionDTO } from '@opentour/contracts';
import React from 'react';

import { useStyles } from '../../theme';

export type Props = {
  competition: CompetitionDTO;
};

const getSportIconByName = (sportName: string) => {
  if (sportName === 'Fútbol') {
    return <SportsSoccerIcon />;
  }
  if (sportName === 'Baloncesto') {
    return <SportsBasketballIcon />;
  }
  if (sportName === 'Voleibol') {
    return <SportsVolleyballIcon />;
  }
};

export const CompetitionRow: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const { id, name, type, sportName } = props.competition;

  const competitionRoute = '/competition/' + id;

  return (
    <TableRow key={name}>
      <TableCell width="40%" component="th" scope="row">
        <Typography>{name}</Typography>
      </TableCell>
      <TableCell width="20%" align="center">
        <Grid item container justify="center" alignItems="center">
          {getSportIconByName(sportName)}
          <Typography className={classes.containerItem}>{sportName}</Typography>
        </Grid>
      </TableCell>
      <TableCell width="20%" align="center">
        {type}
      </TableCell>
      <TableCell width="20%" align="center">
        <Button variant="contained" color="primary" href={competitionRoute}>
          Ver
        </Button>
      </TableCell>
    </TableRow>
  );
};
