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

export default function Competitions() {
  const classes = useStyles();
  const [session, loading] = useSession();
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
            <Typography variant="h2">Competitions list</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleClickOpen}
            >
              <Typography variant="button">Create competition</Typography>
            </Button>
          </Grid>
          <CompetitionWizard open={open} onClose={handleClose} />
        </Grid>
        <Grid item container>
          <CompetitionsList competitions={competitions} />
        </Grid>
      </Grid>
    </Layout>
  );
}
