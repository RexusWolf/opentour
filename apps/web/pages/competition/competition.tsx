import { Competition, Layout } from '@opentour/ui';
import { useSession } from 'next-auth/client';
import React from 'react';

export default function CompetitionPage() {
  const [session, loading] = useSession();

  return (
    <Layout session={session}>
      <Competition />
    </Layout>
  );
}
