import { Tab, Tabs } from '@material-ui/core';
import {
  CompetitionDTO,
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
  competition: CompetitionDTO;
};

export const CompetitionTabs = ({
  matches,
  teams,
  ranking,
  competition,
}: CompetitionTabsProps) => {
  const { type, scoreSystem, currentJourney, hasStarted } = competition;
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
        {type === 'LIGA' && <Tab label="Ranking" />}
      </Tabs>
      <CompetitionTab value={tabIndex} index={0}>
        <TeamList
          competitionHasStarted={hasStarted}
          teams={teams}
          moderatorIds={competition.moderatorIds}
        />
      </CompetitionTab>
      <CompetitionTab value={tabIndex} index={1}>
        {type === 'LIGA' ? (
          <LeagueCalendar matches={matches} />
        ) : (
          <TournamentCalendar
            currentJourney={currentJourney}
            matches={matches}
          />
        )}
      </CompetitionTab>
      {type === 'LIGA' && (
        <CompetitionTab value={tabIndex} index={2}>
          <Ranking ranking={ranking} scoreSystem={scoreSystem} />
        </CompetitionTab>
      )}
    </>
  );
};
