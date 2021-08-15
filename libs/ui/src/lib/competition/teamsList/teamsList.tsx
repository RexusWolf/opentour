import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { TeamDTO } from '@opentour/contracts';
import { useSession } from 'next-auth/client';
import React from 'react';

import { useStyles } from '../../theme';
import { doRequest } from '../../utils/doRequest';
import { TeamSlot } from '../shared/teamSlot/teamSlot';

export type Props = {
  teams: TeamDTO[];
  moderatorIds: string[];
  competitionHasStarted: boolean;
};

export const TeamList: React.FunctionComponent<Props> = ({
  teams,
  moderatorIds,
  competitionHasStarted,
}) => {
  const [session, loading] = useSession();
  const classes = useStyles();

  const teamsInList = teams || [];

  const canModerateTeam = (moderatorIds: string[], teamCaptainId: string) => {
    if (!loading) {
      if (session!.id === teamCaptainId) {
        return true;
      }
      if (moderatorIds.includes(session!.id as string)) {
        return true;
      }
    }
    return false;
  };
  const handleDeleteTeam = async (teamId: string) => {
    await doRequest({
      method: 'DELETE',
      url: `/teams/${teamId}`,
    });

    window.location.reload();
  };
  return (
    <>
      {teamsInList.length ? (
        teamsInList.map((team) => (
          <div key={team.id}>
            {team !== teamsInList[0] && <Divider light />}
            <Grid
              container
              alignItems="center"
              className={classes.containerItem}
            >
              <Grid item xs={11}>
                <TeamSlot name={team.name} logo={team.logo} />
              </Grid>
              <Grid container item justify="center" xs={1}>
                <Button
                  variant="contained"
                  className={classes.errorButton}
                  onClick={() => handleDeleteTeam(team.id)}
                  disabled={
                    competitionHasStarted ||
                    !canModerateTeam(moderatorIds, team.captainId)
                  }
                >
                  Eliminar
                </Button>
              </Grid>
            </Grid>
          </div>
        ))
      ) : (
        <Typography variant="h4">No hay equipos en la competición</Typography>
      )}
    </>
  );
};
