import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { CreateCompetitionDTO } from '@opentour/contracts';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/client';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { useStyles } from '../../theme';
import { CounterButton } from './CounterButton';

type Props = {
  open: boolean;
  onClose: () => void;
};

export async function createCompetition(
  competition: CreateCompetitionDTO,
  session: Session
) {
  if (session) {
    console.log(
      '🚀 ~ file: competitionWizard.tsx ~ line 28 ~ session.token',
      session
    );
    console.log(
      '🚀 ~ file: competitionWizard.tsx ~ line 28 ~ session.token',
      session.access_token
    );
    await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || process.env.NX_PUBLIC_API_URL
      }/api/competitions`,
      {
        method: 'Post',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(competition),
      }
    );

    window.location.reload();
  }
}

export const CompetitionWizard: React.FunctionComponent<Props> = ({
  open,
  onClose,
}) => {
  const [session, loading] = useSession();
  const classes = useStyles();
  const [sport, setSport] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');

  const initialValues: CreateCompetitionDTO = {
    id: uuid(),
    name: '',
    sportName: sport,
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
    !loading && (await createCompetition(competitionValues, session!));

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
