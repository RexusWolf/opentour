import { Grid, Typography } from '@material-ui/core';
import { MatchDTO } from '@opentour/contracts';
import React from 'react';

import { CalendarMatch } from './calendarMatch/calendarMatch';

type Props = {
  matches: MatchDTO[];
};

export const Calendar: React.FunctionComponent<Props> = ({ matches }) => {
  const matchesInList = matches || [];

  return (
    <Grid container>
      {matches.length ? (
        matches.map((match, index) => (
          <CalendarMatch key={index} match={match} />
        ))
      ) : (
        <Typography variant="h4">Competition has not started</Typography>
      )}
    </Grid>
  );
};
