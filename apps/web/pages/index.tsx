import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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
