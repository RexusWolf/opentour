import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { CreateCompetitionDTO } from '@opentour/contracts';
import React from 'react';
import { v4 as uuid } from 'uuid';

import { useStyles } from '../../theme';
import { doRequest } from '../../utils/doRequest';

export type Props = {
  open: boolean;
  onClose: () => void;
};

export async function createCompetition(competition: CreateCompetitionDTO) {
  doRequest({ method: 'POST', url: '/competitions', data: competition });
}

export const CompetitionWizard: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [sport, setSport] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');

  const currentUserId = uuid();

  const initialValues: CreateCompetitionDTO = {
    id: currentUserId,
    name: '',
    sportName: sport,
    moderatorId: currentUserId,
    type,
  };

  const [competitionValues, setCompetitionValues] = React.useState(
    initialValues
  );

  const { open, onClose } = props;

  const handleChange = (property, value) => {
    setCompetitionValues({
      ...competitionValues,
      [property]: value,
    });
  };
  const handleCreateCompetition = async () => {
    await createCompetition(competitionValues);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form>
        <Grid container className={classes.container}>
          <Typography className={classes.containerItem} color="textSecondary">
            Competition name
          </Typography>
          <Grid container item className={classes.containerItem}>
            <TextField
              fullWidth
              name="name"
              id="standard-size-small"
              placeholder="XV Edición Trofeo Rector - Baloncesto"
              size="small"
              onChange={(event) => {
                handleChange('name', event.target.value);
              }}
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
              value={type}
              exclusive
              onChange={(event, type) => {
                setType(type);
                handleChange('type', type);
              }}
            >
              <ToggleButton disabled={true} value="TORNEO">
                Torneo
              </ToggleButton>
              <ToggleButton value="LIGA">Liga</ToggleButton>
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
              onChange={(event, sport) => {
                setSport(sport);
                handleChange('sportName', sport);
              }}
            >
              <ToggleButton value="Baloncesto">Baloncesto</ToggleButton>
              <ToggleButton value="Fútbol">Fútbol</ToggleButton>
              <ToggleButton value="Voleibol">Voleibol</ToggleButton>
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
              onClick={async () => await handleCreateCompetition()}
            >
              Create competition
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
