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
  currentJourney?: string;
  competitionScoreSystem: CompetitionScoreSystem;
};

export const CompetitionTabs = ({
  matches,
  teams,
  ranking,
  competitionType,
  competitionScoreSystem,
  currentJourney,
}: CompetitionTabsProps) => {
  const [tabIndex, setTabIndex] = React.useState(0);
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
        {competitionType === 'LIGA' && <Tab label="Ranking" />}
      </Tabs>
      <CompetitionTab value={tabIndex} index={0}>
        <TeamList teams={teams} />
      </CompetitionTab>
      <CompetitionTab value={tabIndex} index={1}>
        {competitionType === 'LIGA' ? (
          <LeagueCalendar matches={matches} />
        ) : (
          <TournamentCalendar
            currentJourney={currentJourney}
            matches={matches}
          />
        )}
      </CompetitionTab>
      {competitionType === 'LIGA' && (
        <CompetitionTab value={tabIndex} index={2}>
          <Ranking ranking={ranking} scoreSystem={competitionScoreSystem} />
        </CompetitionTab>
      )}
    </>
  );
};
