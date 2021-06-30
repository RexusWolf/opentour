import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { __classPrivateFieldSet } from 'tslib';

import { theme, useStyles } from '../../theme';

type Props = {
  teamLogos: string[];
  setTeamLogo: (logo: string) => void;
};

export const LogoSelector: React.FunctionComponent<Props> = ({
  setTeamLogo,
  teamLogos,
}) => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Carousel
        prev={(previous: number) => {
          setTeamLogo(teamLogos[previous]);
        }}
        next={(next: number) => {
          setTeamLogo(teamLogos[next]);
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
        {teamLogos.map((logo) => (
          <Grid container justify="center" item>
            <img src={logo} />
          </Grid>
        ))}
      </Carousel>
    </Grid>
  );
};
