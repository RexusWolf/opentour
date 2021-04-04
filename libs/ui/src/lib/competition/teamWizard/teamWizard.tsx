import { Button, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';

import { useStyles } from '../../theme';

export type Props = {
  open: boolean;
  onClose: () => void;
};

export const TeamWizard: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const { open, onClose } = props;

  const handleCreateTeam = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
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
    </Dialog>
  );
};
