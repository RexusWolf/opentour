import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import { EditMatchDTO, MatchDTO, RegisterMatchDTO } from '@opentour/contracts';
import { format } from 'date-fns';
import React from 'react';

import { useStyles } from '../../../theme';
import { doRequest } from '../../../utils/doRequest';
import { TeamSlot } from '../../shared/teamSlot/teamSlot';
import { getRandomLogo } from '../../utils/getRandomLogo';
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

const registerMatch = async (matchId: string) => {
  await doRequest({
    method: 'PUT',
    url: `/matches/${matchId}/register`,
  });
};

export const CalendarMatch: React.FunctionComponent<CalendarMatchProps> = ({
  match,
}) => {
  const classes = useStyles();

  const { localTeam, visitorTeam, date: matchDate, index, finished } = match;

  const matchResult = {
    localTeamScore: localTeam.score,
    visitorTeamScore: visitorTeam.score,
  };

  const [result, setResult] = React.useState(matchResult);
  const [date, setDate] = React.useState(matchDate);
  const [isScheduled, setIsScheduled] = React.useState(match.date !== null);
  const [open, setOpen] = React.useState(false);
  const [openFinishDialog, setOpenFinishDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeFinishDialog = () => {
    setOpenFinishDialog(false);
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

  const handleFinishMatch = async (match: MatchDTO) => {
    await registerMatch(match.id);
  };

  const handleWasModified = async () => {
    await modifyMatch(match.id, { date, result });
  };

  const handleWasScheduled = async () => {
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
            Resultado {finished ? 'final' : 'provisional'}:{' '}
            {result.localTeamScore} - {result.visitorTeamScore}{' '}
          </Typography>
        )}
        <TeamSlot name={localTeam.name} logo={getRandomLogo()} />
        <TeamSlot name={visitorTeam.name} logo={getRandomLogo()} />
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
              disabled={finished !== null}
              onClick={handleClickOpen}
            >
              Modify
            </Button>
            <Button
              size="small"
              className={[classes.tertiaryButton, classes.containerItem].join(
                ' '
              )}
              disabled={finished !== null}
              variant="contained"
              onClick={() => setOpenFinishDialog(true)}
            >
              Finish
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
            handleWasScheduled={async () => {
              handleWasScheduled();
              await handleWasModified();
            }}
            onClose={handleClose}
          />
        </Dialog>
        <Dialog onClose={closeFinishDialog} open={openFinishDialog}>
          <Grid container className={classes.container}>
            <Grid item>
              <Typography>
                Do you really want to finish the match? The results will be
                permanently registered
              </Typography>
            </Grid>
            <Grid container item justify="flex-end">
              <Button
                className={[classes.tertiaryButton, classes.containerItem].join(
                  ' '
                )}
                variant="contained"
                onClick={() => {
                  handleFinishMatch(match);
                  closeFinishDialog();
                }}
              >
                Finish match
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  );
};
