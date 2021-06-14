import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';

import { CompetitionWizard } from '../competition/competitionWizard/competitionWizard';
import { useStyles } from '../theme';

export const Homepage: React.FunctionComponent = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
        sm={6}
        xs={12}
        style={{
          padding: 60,
          backgroundColor: '#000000CC',
        }}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Button
          variant="text"
          className={classes.homeButton}
          href="/competition/competitions"
        >
          <Typography variant="h4">Competitions list</Typography>
        </Button>
        <Button className={classes.homeButton} variant="text">
          <Typography variant="h4">My competitions</Typography>
        </Button>
        <Button
          className={classes.homeButton}
          variant="text"
          onClick={handleClickOpen}
        >
          <Typography variant="h4">Create competition</Typography>
        </Button>
        <CompetitionWizard open={open} onClose={handleClose} />
      </Grid>
      <Grid item sm={6}></Grid>
    </Grid>
  );
};
