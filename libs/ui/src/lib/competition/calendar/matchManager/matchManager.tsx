import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';

import { useStyles } from '../../../theme';
import { DateAndTimePicker } from '../dateAndTimePicker/dateAndTimePicker';

export type Props = {
  isScheduled: boolean;
  allowDrawn: boolean;
  matchDate: Date | null;
  result: { localTeamScore: number; visitorTeamScore: number };
  onClose: () => void;
  handleLocalTeamScore: (value: string) => void;
  handleVisitorTeamScore: (value: string) => void;
  handleWasModified: (date: Date) => void;
};

export const MatchManager: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const {
    onClose,
    matchDate,
    result,
    handleLocalTeamScore,
    handleVisitorTeamScore,
    handleWasModified,
    allowDrawn,
  } = props;

  const [isScheduled, setIsScheduled] = React.useState(props.isScheduled);
  const initialDate = matchDate ? matchDate : new Date();
  const [date, setDate] = React.useState(initialDate);

  const handleClose = () => {
    onClose();
  };

  const handleModify = () => {
    handleWasModified(date);
    onClose();
  };

  const dateChange = (date: Date) => {
    setIsScheduled(true);
    setDate(date);
  };

  const resultIsInvalid = () => {
    if (result.localTeamScore === result.visitorTeamScore && !allowDrawn) {
      return true;
    }
    return false;
  };

  return (
    <Grid container className={classes.container}>
      <Grid
        container
        item
        xs={12}
        justify="center"
        className={classes.containerItem}
      >
        <DateAndTimePicker initialDate={date} dateChange={dateChange} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        justify="center"
        className={classes.containerItem}
      >
        <TextField
          fullWidth
          disabled={!isScheduled}
          label="Puntuación equipo Local"
          id="standard-size-small"
          defaultValue={result.localTeamScore}
          onChange={(event) => handleLocalTeamScore(event.target.value)}
          size="small"
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        justify="center"
        className={classes.containerItem}
      >
        <TextField
          fullWidth
          disabled={!isScheduled}
          label="Puntuación equipo Visitante"
          id="standard-size-small"
          defaultValue={result.visitorTeamScore}
          onChange={(event) => handleVisitorTeamScore(event.target.value)}
          size="small"
        />
      </Grid>
      <Grid container justify="flex-end" className={classes.container}>
        <Button
          className={classes.containerItem}
          color="secondary"
          variant="contained"
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          className={classes.containerItem}
          color="primary"
          variant="contained"
          disabled={isScheduled && resultIsInvalid()}
          onClick={() => handleModify()}
        >
          {!isScheduled ? 'Programar partido' : 'Modificar partido'}
        </Button>
      </Grid>
    </Grid>
  );
};
