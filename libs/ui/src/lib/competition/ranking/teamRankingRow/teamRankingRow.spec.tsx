import { Table, TableBody } from '@material-ui/core';
import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { RankingTeam } from '../ranking';
import { TeamRankingRow } from './teamRankingRow';

describe('TeamRankingRow', () => {
  const defaultProps = {
    team: aTeam(),
  };

  it('should render successfully', () => {
    const { baseElement } = render(
      <Table>
        <TableBody>
          <TeamRankingRow {...defaultProps} />
        </TableBody>
      </Table>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render a team slot with a team name and its logo', () => {
    const { getByText } = render(
      <Table>
        <TableBody>
          <TeamRankingRow {...defaultProps} />
        </TableBody>
      </Table>
    );
    getByText(defaultProps.team.name);
    getByText(defaultProps.team.matchPlayeds);
    getByText(defaultProps.team.victories);
    getByText(defaultProps.team.ties);
    getByText(defaultProps.team.defeats);
    getByText(defaultProps.team.points);
  });
});

function aTeam(): RankingTeam {
  return {
    name: faker.name.title(),
    matchPlayeds: faker.datatype.number(),
    victories: faker.datatype.number(),
    ties: faker.datatype.number(),
    defeats: faker.datatype.number(),
    points: faker.datatype.number(),
    lastFive: ['victory', 'tie', 'tie', 'defeat', 'tie'],
  };
}
