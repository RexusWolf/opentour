import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React from 'react';

import { useStyles } from '../theme';

export type Props = {
  open: boolean;
  onClose: () => void;
};

export const CompetitionWizard: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const { open, onClose } = props;

  const [sport, setSport] = React.useState<string | null>('');
  const [competition, setCompetition] = React.useState<string | null>('');

  const handleCreateCompetition = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleSport = (newSport: string) => {
    setSport(newSport);
  };

  const handleCompetition = (newCompetition: string) => {
    setCompetition(newCompetition);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container className={classes.container}>
        <Typography className={classes.containerItem} color="textSecondary">
          Competition name
        </Typography>
        <Grid container item className={classes.containerItem}>
          <TextField
            fullWidth
            id="standard-size-small"
            placeholder="XV Edición Trofeo Rector - Baloncesto"
            size="small"
          />
        </Grid>
        <Typography className={classes.containerItem} color="textSecondary">
          Select type of competition:
        </Typography>
        <Grid
          item
          container
          justify="space-around"
          className={classes.containerItem}
        >
          <ToggleButtonGroup
            value={competition}
            exclusive
            onChange={(event, competition) => handleCompetition(competition)}
          >
            <ToggleButton disabled={true} value="tournament">
              Tournament
            </ToggleButton>
            <ToggleButton value="freeForAll">Free For All</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Typography className={classes.containerItem} color="textSecondary">
          Select sport:
        </Typography>
        <Grid
          item
          container
          justify="space-around"
          className={classes.containerItem}
        >
          <ToggleButtonGroup
            value={sport}
            exclusive
            onChange={(event, sport) => handleSport(sport)}
          >
            <ToggleButton value="basketball">Basketball</ToggleButton>
            <ToggleButton value="football">Football</ToggleButton>
            <ToggleButton value="voleyball">Voleyball</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid container justify="flex-end" className={classes.container}>
          <Button
            className={classes.containerItem}
            color="secondary"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className={classes.containerItem}
            color="primary"
            variant="contained"
            onClick={handleCreateCompetition}
          >
            Create competition
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};
