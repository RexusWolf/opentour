import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { v4 as uuid } from 'uuid';

import { CreateTeamDTO } from '../../../../../contracts/src';
import { useStyles } from '../../theme';
import { doRequest } from '../../utils/doRequest';

export type Props = {
  open: boolean;
  onClose: () => void;
  competitionId: string;
};

export async function createTeam(team: CreateTeamDTO) {
  doRequest({ method: 'POST', url: '/teams', data: team });
}

export const TeamWizard: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [name, setName] = React.useState<string>('');

  const { open, onClose } = props;

  const handleCreateTeam = async () => {
    const team: CreateTeamDTO = {
      id: uuid(),
      name,
      competitionId: props.competitionId,
      captainId: uuid(),
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
