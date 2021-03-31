import { Grid } from '@material-ui/core';
import React from 'react';

import { CalendarMatch, Match } from '../calendar/calendarMatch';

type Props = {
  matches: Match[];
};

export const Calendar: React.FunctionComponent<Props> = (props) => {
  return (
    <Grid container>
      {props.matches.map((match, index) => (
        <CalendarMatch
          key={index}
          isScheduled={match.isScheduled}
          localTeam={match.localTeam}
          visitorTeam={match.visitorTeam}
          date={match.date}
        />
      ))}
    </Grid>
  );
};
