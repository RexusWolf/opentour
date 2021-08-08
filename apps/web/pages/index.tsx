import { Homepage, Layout } from '@opentour/ui';
import hi from 'date-fns/esm/locale/hi/index.js';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';

export default function Index() {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/signIn');
    }
  }, [loading, session, router]);
  return <Layout session={session!}>{session && <Homepage />}</Layout>;
}
