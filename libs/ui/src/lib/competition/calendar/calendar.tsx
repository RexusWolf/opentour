import { Grid } from '@material-ui/core';
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
      {matches &&
        matches.map((match, index) => (
          <CalendarMatch key={index} match={match} />
        ))}
    </Grid>
  );
};
