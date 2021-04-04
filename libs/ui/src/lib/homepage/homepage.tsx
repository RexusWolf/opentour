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
    <Grid container>
      <Grid
        item
        container
        md={6}
        xs={12}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Button
          className={classes.homeButton}
          variant="contained"
          color="primary"
          href="/competition/competitions"
        >
          <Typography variant="h4">Competitions list</Typography>
        </Button>
        <Button
          className={classes.homeButton}
          variant="contained"
          color="primary"
        >
          <Typography variant="h4">My competitions</Typography>
        </Button>
        <Button
          className={classes.homeButton}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          <Typography variant="h4">Create competition</Typography>
        </Button>
        <CompetitionWizard open={open} onClose={handleClose} />
      </Grid>
      <Grid item container justify="center" md={6} xs={12}>
        <img
          width="100%"
          alt="opentour-homepage-logo"
          src="https://www.graphicsprings.com/filestorage/stencils/713d3d68575cf7a54570c5ba2efec1e9.png?width=1200&height=1200"
        />
      </Grid>
    </Grid>
  );
};
