import { Button, Divider, Grid } from '@material-ui/core';
import React from 'react';

import { useStyles } from '../../theme';
import { Team } from '../shared/Team';
import { TeamSlot } from '../shared/teamSlot/teamSlot';

export type Props = {
  teams: Team[];
};

export const TeamList: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      {props.teams.map((team) => (
        <div key={team.name}>
          {team !== props.teams[0] && <Divider light />}
          <Grid container alignItems="center" className={classes.containerItem}>
            <Grid item xs={11}>
              <TeamSlot name={team.name} logo={team.logo} />
            </Grid>
            <Grid container item justify="center" xs={1}>
              <Button variant="contained" className={classes.errorButton}>
                Remove
              </Button>
            </Grid>
          </Grid>
        </div>
      ))}
    </>
  );
};
