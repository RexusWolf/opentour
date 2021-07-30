import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { TeamDTO } from '@opentour/contracts';
import React from 'react';

import { useStyles } from '../../theme';
import { TeamSlot } from '../shared/teamSlot/teamSlot';

export type Props = {
  teams: TeamDTO[];
};

export const TeamList: React.FunctionComponent<Props> = ({ teams }) => {
  const classes = useStyles();

  const teamsInList = teams || [];

  return (
    <>
      {teamsInList.length ? (
        teamsInList.map((team) => (
          <div key={team.id}>
            {team !== teamsInList[0] && <Divider light />}
            <Grid
              container
              alignItems="center"
              className={classes.containerItem}
            >
              <Grid item xs={11}>
                <TeamSlot name={team.name} logo={team.logo} />
              </Grid>
              <Grid container item justify="center" xs={1}>
                <Button variant="contained" className={classes.errorButton}>
                  Eliminar
                </Button>
              </Grid>
            </Grid>
          </div>
        ))
      ) : (
        <Typography variant="h4">No hay equipos en la competición</Typography>
      )}
    </>
  );
};
