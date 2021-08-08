import { Grid, Typography } from '@material-ui/core';
import { MatchDTO } from '@opentour/contracts';
import React from 'react';

import { useStyles } from '../../theme';
import { CalendarMatch } from './calendarMatch/calendarMatch';

type Props = {
  matches: MatchDTO[];
  currentJourney?: string;
};

export const TournamentCalendar: React.FunctionComponent<Props> = ({
  matches,
  currentJourney,
}) => {
  const classes = useStyles();
  const matchesInList = matches || [];

  const eightFinalMatches = matchesInList.filter(
    (match) => match.journey === 'Octavos'
  );
  const quarterFinalMatches = matchesInList.filter(
    (match) => match.journey === 'Cuartos'
  );
  const semifinalMatches = matchesInList.filter(
    (match) => match.journey === 'Semifinal'
  );
  const finalMatch = matchesInList.filter((match) => match.journey === 'Final');

  return (
    <Grid container>
      {eightFinalMatches.length ? (
        <Grid item container className={classes.calendarBlock}>
          <Grid
            item
            container
            justify="center"
            className={classes.containerItem}
          >
            <Typography variant="h5">RONDA DE OCTAVOS</Typography>
          </Grid>
          {eightFinalMatches.map((match, index) => (
            <CalendarMatch
              allowDrawn={false}
              key={index}
              match={match}
              editable={match.journey === currentJourney}
              competitionType="TORNEO"
            />
          ))}
        </Grid>
      ) : null}
      {quarterFinalMatches.length ? (
        <Grid item container className={classes.calendarBlock}>
          <Grid
            item
            container
            justify="center"
            className={classes.containerItem}
          >
            <Typography variant="h5">RONDA DE CUARTOS</Typography>
          </Grid>
          {quarterFinalMatches.map((match, index) => (
            <CalendarMatch
              allowDrawn={false}
              key={index}
              match={match}
              editable={match.journey === currentJourney}
              competitionType="TORNEO"
            />
          ))}
        </Grid>
      ) : null}
      {semifinalMatches.length ? (
        <Grid item container className={classes.calendarBlock}>
          <Grid
            item
            container
            justify="center"
            className={classes.containerItem}
          >
            <Typography variant="h5">RONDA SEMIFINAL</Typography>
          </Grid>
          {semifinalMatches.map((match, index) => (
            <CalendarMatch
              allowDrawn={false}
              key={index}
              match={match}
              editable={match.journey === currentJourney}
              competitionType="TORNEO"
            />
          ))}
        </Grid>
      ) : null}
      {finalMatch.length ? (
        <Grid item container className={classes.calendarBlock}>
          <Grid
            item
            container
            justify="center"
            className={classes.containerItem}
          >
            <Typography variant="h5">RONDA FINAL</Typography>
          </Grid>
          {finalMatch.map((match, index) => (
            <CalendarMatch
              allowDrawn={false}
              key={index}
              match={match}
              editable={match.journey === currentJourney}
              competitionType="TORNEO"
            />
          ))}
        </Grid>
      ) : null}
    </Grid>
  );
};
