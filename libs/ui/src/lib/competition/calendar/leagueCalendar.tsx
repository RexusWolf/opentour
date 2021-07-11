import { Grid, Typography } from '@material-ui/core';
import { MatchDTO } from '@opentour/contracts';
import React from 'react';

import { CalendarMatch } from './calendarMatch/calendarMatch';

type Props = {
  matches: MatchDTO[];
};

export const LeagueCalendar: React.FunctionComponent<Props> = ({ matches }) => {
  const matchesInList = matches || [];

  return (
    <Grid container>
      {matchesInList.length ? (
        matchesInList.map((match, index) => (
          <CalendarMatch key={index} match={match} />
        ))
      ) : (
        <Typography variant="h4">Competition has not started</Typography>
      )}
    </Grid>
  );
};
