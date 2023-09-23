import React from 'react';
import Subscriptions from '../../components/communities/Subscriptions';
import { useAuth } from '../../utils/context/authContext';

export default function MyCommunities() {
  const { user } = useAuth();

  return (
    <main>
      <header>
        <h1>
          {`${user.displayName}'s Communities`}
        </h1>
      </header>
      <section className="userCommunities">
        <Subscriptions />
      </section>
    </main>
  );
}
