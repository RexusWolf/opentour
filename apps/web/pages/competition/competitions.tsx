import { CompetitionsList, Layout } from '@opentour/ui';
import { useSession } from 'next-auth/client';
import React from 'react';

import { competitions } from './mockedCompetitions';

export default function Competitions() {
  const [session, loading] = useSession();

  return (
    <Layout session={session}>
      <CompetitionsList competitions={competitions} />
    </Layout>
  );
}
