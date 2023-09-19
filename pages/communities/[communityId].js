import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Paper } from '@mui/material';
import { getSingleCommunity } from '../../api/communityData';
import CommunitySubmissions from '../../components/communities/CommunitySubmissions';
import CommunityButtonGroup from '../../components/communities/communityButtonGroup/CommunityButtonGroup';
import Subscribe from '../../components/communities/Subscribe';

export default function CommunityPage() {
  const [community, setCommunity] = useState({});
  const router = useRouter();

  const { communityId } = router.query;

  const communityInfo = (id) => {
    getSingleCommunity(id).then(setCommunity);
  };

  useEffect(() => {
    communityInfo(communityId);
  }, [communityId]);

  return (
    <Paper
      sx={{
        bgcolor: 'rgb(5, 50, 5)',
        width: '80vw',
        height: '80vh',
      }}
    >
      <header>
        <h1>{`Welcome to the ${community.name} page`}</h1>
        <Subscribe communityObj={community} />
        <CommunityButtonGroup />
      </header>
      <CommunitySubmissions communityObj={community} />
    </Paper>
  );
}
