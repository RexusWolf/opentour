import { Table, TableBody } from '@material-ui/core';
import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';

import { TeamStatistics } from '../../shared/TeamStatistics';
import { TeamRankingRow } from './teamRankingRow';

describe('TeamRankingRow', () => {
  const defaultProps = {
    team: aTeamStatistics(),
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
    getByText(defaultProps.team.pj);
    getByText(defaultProps.team.v);
    getByText(defaultProps.team.e);
    getByText(defaultProps.team.d);
    getByText(defaultProps.team.pts);
  });
});

function aTeamStatistics(): TeamStatistics {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.title(),
    logo: faker.image.imageUrl(),
    pj: faker.datatype.number(),
    v: faker.datatype.number(),
    e: faker.datatype.number(),
    d: faker.datatype.number(),
    pts: faker.datatype.number(),
    lastFive: ['victory', 'tie', 'tie', 'defeat', 'tie'],
  };
}
