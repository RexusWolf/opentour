import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { __classPrivateFieldSet } from 'tslib';

import { theme, useStyles } from '../../theme';
import { teams } from '../shared/teams';

type Props = {
  setTeamLogo: (logo: string) => void;
};

export const LogoSelector: React.FunctionComponent<Props> = ({
  setTeamLogo,
}) => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Carousel
        prev={(previous: number) => {
          setTeamLogo(teams[previous].logo);
        }}
        next={(next: number) => {
          setTeamLogo(teams[next].logo);
        }}
        navButtonsProps={{
          className: 'carouselNavButton',
          style: {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
        navButtonsAlwaysVisible
        className={classes.carousel}
        indicators={false}
        autoPlay={false}
      >
        {teams.map((team, i) => (
          <Grid container justify="center" item>
            <img src={team.logo} />
          </Grid>
        ))}
      </Carousel>
    </Grid>
  );
};
