import { Button, Grid, Typography } from '@material-ui/core';
import { useCompetitions } from '@opentour/hooks';
import {
  CompetitionsList,
  CompetitionWizard,
  Layout,
  useStyles,
} from '@opentour/ui';
import { useSession } from 'next-auth/client';
import React from 'react';
import { v4 as uuid } from 'uuid';

export default function Competitions() {
  const classes = useStyles();
  const [session, _loading] = useSession();
  const currentUserId = uuid();
  const competitions = useCompetitions();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout session={session!}>
      <Grid container className={classes.marginContainer}>
        <Grid container alignItems="center" className={classes.container}>
          <Grid item xs={10}>
            <Typography variant="h2">Lista de Competiciones</Typography>
          </Grid>
          <Grid item xs={2}>
            <CreateCompetitionButton handleClickOpen={handleClickOpen} />
          </Grid>
        </Grid>
        <CompetitionWizard
          userId={currentUserId}
          open={open}
          onClose={handleClose}
        />
        <Grid item container>
          <CompetitionsList competitions={competitions} />
        </Grid>
      </Grid>
    </Layout>
  );
}

const CreateCompetitionButton = ({ handleClickOpen }) => {
  return (
    <Button color="secondary" variant="contained" onClick={handleClickOpen}>
      <Typography variant="button">Crear competición</Typography>
    </Button>
  );
};
