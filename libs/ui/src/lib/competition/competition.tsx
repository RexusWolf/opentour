import { Button, Grid, Tab, Tabs } from '@material-ui/core';
import { CompetitionDTO } from '@opentour/contracts';
import {
  useMatchesByCompetitionId,
  useRankingByCompetitionId,
  useTeamsByCompetitionId,
} from '@opentour/hooks';
import React from 'react';

import { useStyles } from '../theme';
import { doRequest } from '../utils/doRequest';
import { Calendar } from './calendar/calendar';
import { CompetitionTab } from './competitionTab/competitionTab';
import { Ranking } from './ranking/ranking';
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
  const [open, setOpen] = React.useState(false);

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

  const [tabIndex, setTabIndex] = React.useState(0);
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  const handleStartCompetition = async () => {
    await generateMatches(teams, competition.id);
    await startCompetition(competition.id);
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
        <Tab label="Teams" />
        <Tab label="Calendar" />
        <Tab label="Ranking" />
      </Tabs>
      <CompetitionTab value={tabIndex} index={0}>
        <TeamList teams={teams} />
      </CompetitionTab>
      <CompetitionTab value={tabIndex} index={1}>
        <Calendar matches={matches} />
      </CompetitionTab>
      <CompetitionTab value={tabIndex} index={2}>
        <Ranking ranking={ranking} />
      </CompetitionTab>
      <Grid container justify="flex-end" className={classes.container}>
        <Button
          className={classes.containerItem}
          color="secondary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Create team for competition
        </Button>
        <TeamWizard
          competitionId={competition.id}
          open={open}
          onClose={handleClose}
        />
        <Button
          className={classes.containerItem}
          color="primary"
          variant="contained"
          disabled={competition.hasStarted || !hasMinimumTeams()}
          onClick={handleStartCompetition}
        >
          Start competition
        </Button>
      </Grid>
    </Grid>
  );
};
