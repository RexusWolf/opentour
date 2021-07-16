import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { CompetitionDTO } from '@opentour/contracts';
import {
  useMatchesByCompetitionId,
  useRankingByCompetitionId,
  useTeamsByCompetitionId,
} from '@opentour/hooks';
import React from 'react';

import { useStyles } from '../theme';
import { doRequest } from '../utils/doRequest';
import { CompetitionTabs } from './CompetitionTabs';
import { teamsWithLogos } from './shared/teams';
import { TeamWizard } from './teamWizard/teamWizard';
import { generateMatches } from './utils/generateMatches';

export type Props = {
  competition: CompetitionDTO;
};

export const Competition: React.FunctionComponent<Props> = ({
  competition,
}) => {
  const classes = useStyles();
  const teams = useTeamsByCompetitionId(competition.id);
  const matches = useMatchesByCompetitionId(competition.id);
  const ranking = useRankingByCompetitionId(competition.id);
  const { name, type } = competition;
  const [moderatorEmail, setModeratorEmail] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const teamLogos = teamsWithLogos.map((team) => team.logo);
  const availableTeamLogos =
    teams &&
    teamLogos.filter((logo) => !teams.find((team) => team.logo === logo));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasMinimumTeams = () => {
    if (teams) {
      if (teams.length > 1) return true;
    }
    return false;
  };

  const startCompetition = async (competitionId: string) => {
    await doRequest({
      method: 'PUT',
      url: `/competitions/${competitionId}/start`,
    });
  };

  const inviteModerator = async (
    competitionId: string,
    moderatorEmail: string
  ) => {
    await doRequest({
      method: 'PUT',
      url: `/competitions/${competitionId}/moderators`,
      data: { moderatorEmail },
    });
  };

  const handleStartCompetition = async () => {
    await generateMatches(teams, competition.id, competition.type);
    await startCompetition(competition.id);
    window.location.reload();
  };

  const handleInviteModerator = async () => {
    await inviteModerator(competition.id, moderatorEmail);
    window.location.reload();
  };

  return (
    <Grid
      container
      direction="column"
      className={[classes.marginContainer, classes.paper].join(' ')}
    >
      <Grid item container justify="center">
        <Typography variant="h4">
          {type}-{name}
        </Typography>
      </Grid>
      <CompetitionTabs
        teams={teams}
        matches={matches}
        ranking={ranking}
        competitionScoreSystem={competition.scoreSystem}
        competitionType={competition.type}
      />
      <Grid container className={classes.container}>
        <Grid item container alignItems="center" xs={9}>
          <TextField
            id="standard-size-small"
            placeholder="email@uco.es"
            name="name"
            onChange={(event) => setModeratorEmail(event.target.value)}
          />
          <Button
            className={[classes.containerItem, classes.tertiaryButton].join(
              ' '
            )}
            variant="contained"
            onClick={handleInviteModerator}
          >
            Invitar moderador
          </Button>
        </Grid>
        <Grid item container justify="space-evenly" xs={3}>
          <Button
            className={classes.containerItem}
            color="secondary"
            variant="contained"
            onClick={handleClickOpen}
            disabled={competition.hasStarted}
          >
            Añadir equipo
          </Button>
          <TeamWizard
            availableTeamLogos={availableTeamLogos}
            competitionId={competition.id}
            open={open}
            onClose={handleClose}
          />
          <Button
            className={classes.containerItem}
            color="primary"
            variant="contained"
            disabled={!hasMinimumTeams()}
            onClick={handleStartCompetition}
          >
            Comenzar competición
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
