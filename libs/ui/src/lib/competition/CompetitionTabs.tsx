import { Tab, Tabs } from '@material-ui/core';
import {
  CompetitionScoreSystem,
  MatchDTO,
  RankingDTO,
  TeamDTO,
} from '@opentour/contracts';
import React from 'react';

import { LeagueCalendar } from './calendar/leagueCalendar';
import { TournamentCalendar } from './calendar/tournamentCalendar';
import { CompetitionTab } from './competitionTab/competitionTab';
import { Ranking } from './ranking/ranking';
import { TeamList } from './teamsList/teamsList';

export type CompetitionTabsProps = {
  matches: MatchDTO[];
  teams: TeamDTO[];
  ranking: RankingDTO;
  competitionType: string;
  competitionScoreSystem: CompetitionScoreSystem;
};

export const CompetitionTabs = ({
  matches,
  teams,
  ranking,
  competitionType,
  competitionScoreSystem,
}: CompetitionTabsProps) => {
  const [tabIndex, setTabIndex] = React.useState(1);
  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  return (
    <>
      <Tabs indicatorColor="primary" value={tabIndex} onChange={handleChange}>
        <Tab label="Equipos" />
        <Tab label="Calendario" />
        <Tab label="Ranking" />
      </Tabs>
      <CompetitionTab value={tabIndex} index={0}>
        <TeamList teams={teams} />
      </CompetitionTab>
      <CompetitionTab value={tabIndex} index={1}>
        {competitionType === 'LIGA' ? (
          <LeagueCalendar matches={matches} />
        ) : (
          <TournamentCalendar matches={matches} />
        )}
      </CompetitionTab>
      <CompetitionTab value={tabIndex} index={2}>
        <Ranking ranking={ranking} scoreSystem={competitionScoreSystem} />
      </CompetitionTab>
    </>
  );
};
