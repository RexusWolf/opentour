import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import { EditMatchDTO, MatchDTO } from '@opentour/contracts';
import { format } from 'date-fns';
import React from 'react';

import { useStyles } from '../../../theme';
import { doRequest } from '../../../utils/doRequest';
import { TeamSlot } from '../../shared/teamSlot/teamSlot';
import { MatchManager } from '../matchManager/matchManager';

type CalendarMatchProps = {
  match: MatchDTO;
};

const modifyMatch = async (matchId: string, editMatchDTO: EditMatchDTO) => {
  await doRequest({
    method: 'PUT',
    url: `/matches/${matchId}`,
    data: editMatchDTO,
  });
};

export const CalendarMatch: React.FunctionComponent<CalendarMatchProps> = ({
  match,
}) => {
  const classes = useStyles();

  const { localTeam, visitorTeam, date: matchDate, finished } = match;

  const matchResult = {
    localTeamScore: localTeam.score,
    visitorTeamScore: visitorTeam.score,
  };

  const [result, setResult] = React.useState(matchResult);
  const [date, setDate] = React.useState(matchDate);
  const [isScheduled, setIsScheduled] = React.useState(match.date !== null);
  const [open, setOpen] = React.useState(false);

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

  const handleWasModified = async (date: Date) => {
    setDate(date);
    await modifyMatch(match.id, { date, result });
  };

  const handleWasScheduled = () => {
    setIsScheduled(true);
  };

  const hasBothTeams = () => {
    if (match.localTeam.name && match.visitorTeam.name) {
      return true;
    }
    return false;
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
            Resultado {finished ? 'final' : 'provisional'}:{' '}
            {result.localTeamScore} - {result.visitorTeamScore}{' '}
          </Typography>
        )}
        <Typography color="textSecondary" className={classes.containerItem}>
          {match.journey !== '-' ? match.journey : null}
        </Typography>
        <TeamSlot name={localTeam.name} logo={localTeam.logo} />
        <TeamSlot name={visitorTeam.name} logo={visitorTeam.logo} />
      </Grid>
      <Grid container item direction="column" alignItems="center" xs={4}>
        {isScheduled ? (
          <>
            {date && (
              <>
                <Typography>{format(new Date(date), 'MMM, dd')}</Typography>
                <Typography>{format(new Date(date), 'kk:mm')}</Typography>
              </>
            )}

            <Button
              size="small"
              className={classes.containerItem}
              color="secondary"
              variant="contained"
              disabled={finished !== null || !hasBothTeams()}
              onClick={handleClickOpen}
            >
              Modificar
            </Button>
          </>
        ) : (
          <Button
            size="small"
            color="primary"
            variant="contained"
            disabled={!hasBothTeams()}
            onClick={handleClickOpen}
          >
            Programar
          </Button>
        )}
        <Dialog onClose={handleClose} open={open}>
          <MatchManager
            matchDate={date}
            isScheduled={isScheduled}
            result={result}
            handleLocalTeamScore={handleLocalTeamScore}
            handleVisitorTeamScore={handleVisitorTeamScore}
            handleWasModified={async (date: Date) => {
              handleWasScheduled();
              await handleWasModified(date);
            }}
            onClose={handleClose}
          />
        </Dialog>
      </Grid>
    </Grid>
  );
};
