import { Button, Divider, Grid, List, ListSubheader } from '@material-ui/core';
import React from 'react';

import { Team } from '../competition/teams';
import { TeamSlot } from '../teamSlot/teamSlot';
import { useStyles } from '../theme';

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
