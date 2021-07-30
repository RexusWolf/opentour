import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { CreateCompetitionDTO } from '@opentour/contracts';
import React from 'react';
import { mutate } from 'swr';
import { v4 as uuid } from 'uuid';

import { useStyles } from '../../theme';
import { doRequest } from '../../utils/doRequest';
import { CounterButton } from './CounterButton';

type Props = {
  userId: string;
  open: boolean;
  onClose: () => void;
};

export async function createCompetition(competition: CreateCompetitionDTO) {
  doRequest({ method: 'POST', url: '/competitions', data: competition });
}

export const CompetitionWizard: React.FunctionComponent<Props> = ({
  open,
  onClose,
  userId,
}) => {
  const classes = useStyles();
  const [sport, setSport] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');

  const initialValues: CreateCompetitionDTO = {
    id: userId,
    name: '',
    sportName: sport,
    moderatorId: userId,
    type,
    scoreSystem: {
      victory: 0,
      tie: 0,
      defeat: 0,
    },
  };

  const [competitionValues, setCompetitionValues] =
    React.useState(initialValues);

  const handleChange = (property, value) => {
    setCompetitionValues({
      ...competitionValues,
      [property]: value,
    });
  };

  const handleCreateCompetition = async () => {
    await createCompetition(competitionValues);

    mutate('/api/competitions');

    onClose();
  };

  const handleClose = () => {
    setCompetitionValues(initialValues);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <form>
        <Grid container className={classes.container}>
          <Typography className={classes.containerItem} color="textSecondary">
            Nombre de la competición
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
            Selecciona el tipo de competición:
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
              <ToggleButton value="TORNEO">Torneo</ToggleButton>
              <ToggleButton value="LIGA">Liga</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Typography className={classes.containerItem} color="textSecondary">
            Selecciona el deporte:
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
          {competitionValues.type === 'LIGA' && (
            <>
              <Typography
                className={classes.containerItem}
                color="textSecondary"
              >
                Selecciona sistema de puntuación:
              </Typography>
              <Grid
                item
                container
                justify="space-around"
                className={classes.containerItem}
              >
                <Grid item>
                  <Typography
                    className={classes.containerItem}
                    color="textSecondary"
                  >
                    Ptos por Victoria:
                  </Typography>
                  <CounterButton
                    handleCounterChange={(counter: number) => {
                      handleChange('scoreSystem', {
                        ...competitionValues.scoreSystem,
                        victory: counter,
                      });
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.containerItem}
                    color="textSecondary"
                  >
                    Ptos por Empate:
                  </Typography>
                  <CounterButton
                    handleCounterChange={(counter: number) => {
                      handleChange('scoreSystem', {
                        ...competitionValues.scoreSystem,
                        tie: counter,
                      });
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.containerItem}
                    color="textSecondary"
                  >
                    Ptos por Derrota:
                  </Typography>
                  <CounterButton
                    handleCounterChange={(counter: number) => {
                      handleChange('scoreSystem', {
                        ...competitionValues.scoreSystem,
                        defeat: counter,
                      });
                    }}
                  />
                </Grid>
              </Grid>
            </>
          )}
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
              onClick={async () => await handleCreateCompetition()}
            >
              Crear competición
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
