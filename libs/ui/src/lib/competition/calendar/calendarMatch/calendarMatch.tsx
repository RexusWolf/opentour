import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';

import { MatchDTO } from '../../../../../../contracts/src';
import { useStyles } from '../../../theme';
import { TeamSlot } from '../../shared/teamSlot/teamSlot';
import { MatchManager } from '../matchManager/matchManager';

type Props = {
  match: MatchDTO;
};
export const CalendarMatch: React.FunctionComponent<Props> = ({ match }) => {
  const classes = useStyles();

  const { localTeamId, visitorTeamId } = match;
  const [result, setResult] = React.useState(match.result);
  const [date, setDate] = React.useState(match.date);
  const [isScheduled, setIsScheduled] = React.useState(
    match.date !== undefined
  );
  const [open, setOpen] = React.useState(false);

  const defaultLogo =
    'https://1.bp.blogspot.com/-aipUpK9KzXI/X4eoge09D9I/AAAAAAABg4c/lvcbdc8I148_NRF4gzuKlR4Wf4KbKGj6gCLcBGAsYHQ/s128/Cordoba%2BCF128x.png';

  const localTeam = {
    id: localTeamId,
    name: localTeamId,
  };

  const visitorTeam = {
    id: visitorTeamId,
    name: visitorTeamId,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLocalTeamScore = (value: string) => {
    setResult({ ...result, localTeamScore: Number(value) });
  };

  const handleVisitorTeamScore = (value: string) => {
    setResult({ ...result, visitorTeamScore: Number(value) });
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleWasScheduled = () => {
    setIsScheduled(true);
  };

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
        {isScheduled && (
          <Typography color="textSecondary" className={classes.containerItem}>
            Match result: {result.localTeamScore} - {result.visitorTeamScore}
          </Typography>
        )}
        <TeamSlot name={localTeam.name} logo={defaultLogo} />
        <TeamSlot name={visitorTeam.name} logo={defaultLogo} />
      </Grid>
      <Grid container item direction="column" alignItems="center" xs={4}>
        {isScheduled ? (
          <>
            {date && (
              <>
                <Typography>{format(date, 'MMM, dd')}</Typography>
                <Typography>{format(date, 'kk:mm')}</Typography>
              </>
            )}

            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={handleClickOpen}
            >
              Modify
            </Button>
          </>
        ) : (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={handleClickOpen}
          >
            Schedule
          </Button>
        )}
        <Dialog onClose={handleClose} open={open}>
          <MatchManager
            date={date}
            isScheduled={isScheduled}
            result={result}
            handleLocalTeamScore={handleLocalTeamScore}
            handleVisitorTeamScore={handleVisitorTeamScore}
            handleDateChange={handleDateChange}
            handleWasScheduled={handleWasScheduled}
            onClose={handleClose}
          />
        </Dialog>
      </Grid>
    </Grid>
  );
};
