import React from 'react';
import Subscriptions from '../../components/communities/Subscriptions';
import { useAuth } from '../../utils/context/authContext';

export default function MyCommunities() {
  const { user } = useAuth();

  return (
    <main>
      <header>
        {user.displayName}`&apos;s Communities
      </header>
      <section>
        <Subscriptions />
      </section>
    </main>
  );
}
