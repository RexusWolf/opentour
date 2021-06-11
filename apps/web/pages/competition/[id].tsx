import { CompetitionDTO } from '@opentour/contracts';
import { useCompetition } from '@opentour/hooks';
import { Competition as CompetitionComponent, Layout } from '@opentour/ui';
import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/client';
import React from 'react';

export default function Competition() {
  const router = useRouter();

  const { id } = router.query;
  const competition = useCompetition(id as string);
  const [session, loading] = useSession();

  const defaultComp = {
    id: '',
    name: '',
    type: '',
    sportName: '',
    moderatorIds: [''],
  };

  return (
    <Layout session={session!}>
      <CompetitionComponent competition={competition || defaultComp} />
    </Layout>
  );
}
