import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import { CreateTeamDTO } from '@opentour/contracts';
import { useSession } from 'next-auth/client';
import React from 'react';
import { v4 as uuid } from 'uuid';

import { useStyles } from '../../theme';
import { doRequest } from '../../utils/doRequest';
import { LogoSelector } from './logoSelector';

export type Props = {
  open: boolean;
  onClose: () => void;
  competitionId: string;
  availableTeamLogos: string[];
};

export async function createTeam(team: CreateTeamDTO) {
  doRequest({ method: 'POST', url: '/teams', data: team });

  window.location.reload();
}

export const TeamWizard: React.FunctionComponent<Props> = ({
  open,
  onClose,
  availableTeamLogos,
  competitionId,
}) => {
  const [session, loading] = useSession();
  const classes = useStyles();
  const [name, setName] = React.useState<string>('');
  const defaultLogo =
    'https://www.greenteam92.com/wp-content/uploads/2017/05/team-placeholder-logo.e50b9536-128x128.png';
  const teamLogosForSelector = availableTeamLogos && [
    ...availableTeamLogos,
    'https://www.greenteam92.com/wp-content/uploads/2017/05/team-placeholder-logo.e50b9536-128x128.png',
  ];
  const [teamLogo, setTeamLogo] = React.useState(defaultLogo);

  React.useEffect(() => {
    if (availableTeamLogos && availableTeamLogos.length) {
      setTeamLogo(teamLogosForSelector[0]);
    }
  }, [availableTeamLogos]);

  const handleCreateTeam = async () => {
    const team: CreateTeamDTO = {
      id: uuid(),
      name,
      competitionId,
      captainId: !loading ? (session!.id as string) : '',
      logo: teamLogo,
    };

    await createTeam(team);
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
            Nombre del equipo
          </Typography>
          <Grid container item className={classes.containerItem}>
            <TextField
              fullWidth
              id="standard-size-small"
              placeholder="UCO Team Basket"
              size="small"
              name="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Grid>
          <Grid
            container
            item
            justify="center"
            className={classes.containerItem}
          >
            <Typography
              variant="subtitle1"
              className={classes.containerItem}
              color="textSecondary"
            >
              Elige el logo del equipo:
            </Typography>
            <Grid container>
              <LogoSelector
                teamLogos={teamLogosForSelector}
                setTeamLogo={setTeamLogo}
              />
            </Grid>
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
              onClick={handleCreateTeam}
            >
              Crear equipo
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
