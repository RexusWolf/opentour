import { Button, Grid, Tab, Tabs, TextField } from '@material-ui/core';
import { CompetitionDTO } from '@opentour/contracts';
import {
  useMatchesByCompetitionId,
  useRankingByCompetitionId,
  useTeamsByCompetitionId,
} from '@opentour/hooks';
import { match } from 'assert';
import React from 'react';

import { useStyles } from '../theme';
import { doRequest } from '../utils/doRequest';
import { LeagueCalendar } from './calendar/leagueCalendar';
import { TournamentCalendar } from './calendar/tournamentCalendar';
import { CompetitionTab } from './competitionTab/competitionTab';
import { Ranking } from './ranking/ranking';
import { teamsWithLogos } from './shared/teams';
import { TeamList } from './teamsList/teamsList';
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

  const roundMatchesAreFinished = () => {
    if (matches) {
      const roundMatches =
        matches &&
        matches.filter((match) => match.journey === competition.currentJourney);
      for (const match of roundMatches) {
        if (match.date === null) return false;
      }
      return true;
    }
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

  const nextRound = async (competitionId: string) => {
    await doRequest({
      method: 'PUT',
      url: `/competitions/${competitionId}/nextRound`,
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

  const [tabIndex, setTabIndex] = React.useState(1);
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  const handleStartCompetition = async () => {
    await generateMatches(teams, competition.id, competition.type);
    await startCompetition(competition.id);
    window.location.reload();
  };

  const handleNextRound = async () => {
    await nextRound(competition.id);
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
        <h1>
          {type} - {name}
        </h1>
      </Grid>
      <Tabs indicatorColor="primary" value={tabIndex} onChange={handleChange}>
        <Tab label="Equipos" />
        <Tab label="Calendario" />
        <Tab label="Ranking" />
      </Tabs>
      <CompetitionTab value={tabIndex} index={0}>
        <TeamList teams={teams} />
      </CompetitionTab>
      <CompetitionTab value={tabIndex} index={1}>
        {competition.type === 'LIGA' ? (
          <LeagueCalendar matches={matches} />
        ) : (
          <TournamentCalendar
            matches={matches}
            currentJourney={competition.currentJourney}
          />
        )}
      </CompetitionTab>
      <CompetitionTab value={tabIndex} index={2}>
        <Ranking ranking={ranking} scoreSystem={competition.scoreSystem} />
      </CompetitionTab>
      <Grid container className={classes.container}>
        <Grid item container alignItems="center" xs={8}>
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
        <Grid item container justify="space-evenly" xs={4}>
          {competition.hasStarted && competition.type === 'TORNEO' && (
            <Button
              className={classes.containerItem}
              color="primary"
              variant="contained"
              disabled={
                competition.currentJourney === 'Final' ||
                !roundMatchesAreFinished()
              }
              onClick={handleNextRound}
            >
              Siguiente Ronda
            </Button>
          )}
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
            disabled={!hasMinimumTeams() || competition.hasStarted}
            onClick={handleStartCompetition}
          >
            Comenzar competición
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
