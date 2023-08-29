import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCommunity } from '../../api/communityData';

export default function CommunityPage() {
  const [community, setCommunity] = useState({});
  const router = useRouter();

  const { communityId } = router.query;

  const getCommunityPage = (id) => {
    getSingleCommunity(id).then(setCommunity);
  };

  useEffect(() => {
    getCommunityPage(communityId);
  }, [communityId]);

  return (
    <h1>{`Welcome to the ${community.name} page`}</h1>
  );
}
