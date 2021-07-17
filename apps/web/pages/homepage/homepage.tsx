import { Button, Grid, Typography } from '@material-ui/core';
import { CompetitionWizard, Layout, useStyles } from '@opentour/ui';
import { useSession } from 'next-auth/client';
import React from 'react';
import { v4 as uuid } from 'uuid';

export const Homepage: React.FunctionComponent = () => {
  const [session, _loading] = useSession();
  const currentUserId = uuid();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout session={session}>
      <Grid
        container
        style={{
          minHeight: '100vh',
          backgroundImage: `url(https://wallpapercave.com/wp/wp2903944.png)`,
          objectFit: 'cover',
        }}
      >
        <Grid
          container
          item
          lg={4}
          xs={12}
          style={{
            padding: 60,
            backgroundColor: '#000000CC',
          }}
          justify="center"
          alignItems="center"
          direction="column"
        >
          <HomepageButtons handleClickOpen={handleClickOpen}>
            <CompetitionWizard
              userId={currentUserId}
              open={open}
              onClose={handleClose}
            />
          </HomepageButtons>
        </Grid>
      </Grid>
    </Layout>
  );
};

const HomepageButtons = ({ handleClickOpen, children }) => {
  const classes = useStyles();
  return (
    <>
      <Button
        variant="text"
        className={classes.homeButton}
        href="/competition/competitions"
      >
        <Typography variant="h4">Lista de Competiciones</Typography>
      </Button>
      <Button className={classes.homeButton} variant="text">
        <Typography variant="h4">Mis competiciones</Typography>
      </Button>
      <Button
        className={classes.homeButton}
        variant="text"
        onClick={handleClickOpen}
      >
        <Typography variant="h4">Crear competición</Typography>
      </Button>
      {children}
    </>
  );
};
