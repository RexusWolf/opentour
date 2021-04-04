import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';

import { useStyles } from '../../../theme';

export type Props = {
  name: string;
  logo: string;
};

export const TeamSlot: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      direction="row"
      alignItems="center"
      className={classes.containerItem}
    >
      <Avatar
        className={classes.containerItem}
        variant="square"
        alt={props.name + '-logo'}
        src={props.logo}
      />
      <Typography className={classes.containerItem}>{props.name}</Typography>
    </Grid>
  );
};
