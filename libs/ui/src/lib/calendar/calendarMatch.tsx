import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';

import { Team } from '../competition/teams';
import { TeamSlot } from '../teamSlot/teamSlot';
import { useStyles } from '../theme';

export type Match = {
  localTeam: Team;
  visitorTeam: Team;
  isScheduled: boolean;
  date: { day: string; hour: string };
};

export const CalendarMatch: React.FunctionComponent<Match> = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      className={classes.calendarMatch}
      alignItems="center"
      lg={3}
      md={6}
      sm={12}
    >
      <Grid container item direction="column" xs={8}>
        <TeamSlot name={props.localTeam.name} logo={props.localTeam.logo} />
        <TeamSlot name={props.visitorTeam.name} logo={props.visitorTeam.logo} />
      </Grid>
      <Grid container item direction="column" alignItems="center" xs={4}>
        {props.isScheduled ? (
          <>
            <Typography>{props.date.day}</Typography>
            <Typography>{props.date.hour}</Typography>
            <Button size="small" color="secondary" variant="contained">
              Modify
            </Button>
          </>
        ) : (
          <Button size="small" color="primary" variant="contained">
            Schedule
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
