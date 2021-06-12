import { Homepage, Layout } from '@opentour/ui';
import { useSession } from 'next-auth/client';
import React from 'react';

export default function Index() {
  const [session, loading] = useSession();

  return (
    <Layout session={session!}>
      <Homepage />
    </Layout>
  );
}
