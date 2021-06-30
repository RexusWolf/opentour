import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import { CreateTeamDTO } from '@opentour/contracts';
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
}

export const TeamWizard: React.FunctionComponent<Props> = ({
  open,
  onClose,
  availableTeamLogos,
  competitionId,
}) => {
  const classes = useStyles();
  const [name, setName] = React.useState<string>('');
  const [teamLogo, setTeamLogo] = React.useState('');

  const handleCreateTeam = async () => {
    const team: CreateTeamDTO = {
      id: uuid(),
      name,
      competitionId,
      captainId: uuid(),
      logo: teamLogo,
    };

    await createTeam(team);
    window.location.reload();
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
            Team name
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
              Select team logo:
            </Typography>
            <Grid container>
              <LogoSelector
                teamLogos={availableTeamLogos}
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
              Create team
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
