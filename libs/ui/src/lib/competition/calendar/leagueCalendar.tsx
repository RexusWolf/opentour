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
          <CalendarMatch
            competitionType="LIGA"
            allowDrawn={true}
            editable={true}
            key={index}
            match={match}
          />
        ))
      ) : (
        <Typography variant="h4">La competición no ha comenzado</Typography>
      )}
    </Grid>
  );
};
