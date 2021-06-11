import { useCompetitions } from '@opentour/hooks';
import { CompetitionsList, Layout } from '@opentour/ui';
import { useSession } from 'next-auth/client';
import React from 'react';

export default function Competitions() {
  const [session, loading] = useSession();
  const competitions = useCompetitions();

  return (
    <Layout session={session!}>
      <CompetitionsList competitions={competitions} />
    </Layout>
  );
}
