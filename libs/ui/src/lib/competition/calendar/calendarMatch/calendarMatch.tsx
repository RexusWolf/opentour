import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';

import { useStyles } from '../../../theme';
import { Match } from '../../shared/Match';
import { TeamSlot } from '../../shared/teamSlot/teamSlot';
import { MatchManager } from '../matchManager/matchManager';

export const CalendarMatch: React.FunctionComponent<Match> = (props) => {
  const classes = useStyles();

  const { localTeam, visitorTeam } = props;
  const [result, setResult] = React.useState(props.result);
  const [date, setDate] = React.useState(props.date);
  const [isScheduled, setIsScheduled] = React.useState(props.isScheduled);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLocalTeamScore = (value: string) => {
    setResult({ ...result, localTeam: Number(value) });
  };

  const handleVisitorTeamScore = (value: string) => {
    setResult({ ...result, visitorTeam: Number(value) });
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
            Match result: {result.localTeam} - {result.visitorTeam}
          </Typography>
        )}
        <TeamSlot name={localTeam.name} logo={localTeam.logo} />
        <TeamSlot name={visitorTeam.name} logo={visitorTeam.logo} />
      </Grid>
      <Grid container item direction="column" alignItems="center" xs={4}>
        {isScheduled ? (
          <>
            <Typography>{format(date, 'MMM, dd')}</Typography>
            <Typography>{format(date, 'kk:mm')}</Typography>
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
