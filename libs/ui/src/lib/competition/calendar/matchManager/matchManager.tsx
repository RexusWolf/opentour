import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';

import { useStyles } from '../../../theme';
import { DateAndTimePicker } from '../dateAndTimePicker/dateAndTimePicker';

export type Props = {
  isScheduled: boolean;
  date: Date | null;
  result: { localTeamScore: number; visitorTeamScore: number };
  onClose: () => void;
  handleLocalTeamScore: (value: string) => void;
  handleVisitorTeamScore: (value: string) => void;
  handleDateChange: (date: Date) => void;
  handleWasScheduled: () => void;
};

export const MatchManager: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const {
    onClose,
    date,
    result,
    handleLocalTeamScore,
    handleVisitorTeamScore,
    handleDateChange,
    handleWasScheduled,
  } = props;

  const [isScheduled, setIsScheduled] = React.useState(props.isScheduled);

  const handleClose = () => {
    onClose();
  };

  const handleModify = (value: string) => {
    handleWasScheduled();
    onClose();
  };

  const dateChange = (date: Date) => {
    setIsScheduled(true);
    handleDateChange(date);
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
        <DateAndTimePicker
          initialDate={date ? date : new Date()}
          dateChange={dateChange}
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
          onClick={() => handleModify('')}
        >
          {!isScheduled ? 'Programar partido' : 'Modificar partido'}
        </Button>
      </Grid>
    </Grid>
  );
};
