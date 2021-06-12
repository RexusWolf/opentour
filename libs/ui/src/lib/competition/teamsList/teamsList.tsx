import { Button, Divider, Grid } from '@material-ui/core';
import { TeamDTO } from '@opentour/contracts';
import React from 'react';

import { useStyles } from '../../theme';
import { TeamSlot } from '../shared/teamSlot/teamSlot';

export type Props = {
  teams: TeamDTO[];
};

export const TeamList: React.FunctionComponent<Props> = ({ teams }) => {
  const classes = useStyles();

  const teamsInList = teams || [];
  const defaultLogo =
    'https://1.bp.blogspot.com/-aipUpK9KzXI/X4eoge09D9I/AAAAAAABg4c/lvcbdc8I148_NRF4gzuKlR4Wf4KbKGj6gCLcBGAsYHQ/s128/Cordoba%2BCF128x.png';

  return (
    <>
      {teamsInList.length ? (
        teamsInList.map((team) => (
          <div key={team.name}>
            {team !== teamsInList[0] && <Divider light />}
            <Grid
              container
              alignItems="center"
              className={classes.containerItem}
            >
              <Grid item xs={11}>
                <TeamSlot name={team.name} logo={defaultLogo} />
              </Grid>
              <Grid container item justify="center" xs={1}>
                <Button variant="contained" className={classes.errorButton}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          </div>
        ))
      ) : (
        <h2>No teams in the competition</h2>
      )}
    </>
  );
};
