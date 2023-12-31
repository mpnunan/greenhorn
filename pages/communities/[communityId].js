import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Paper } from '@mui/material';
import Link from 'next/link';
import { getSingleCommunity } from '../../api/communityData';
import CommunitySubmissions from '../../components/communities/CommunitySubmissions';
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
        bgcolor: 'rgba(5, 50, 5, .6)',
        width: '100%',
        height: '100%',
      }}
    >
      <header>
        <h1>{`The ${community.name} page`}</h1>
        <Subscribe communityObj={community} communityId={communityId} />
        <h3>{`${community.description}`}</h3>
        <Link href={`/requests/communityRequests/${community.id}`} passHref>
          <Button
            variant="text"
            sx={{
              color: 'antiquewhite',
              textAlign: 'center',
              borderRadius: '4px',
              border: '1px solid rgba(0, 0, 0, 0)',
              ':hover': {
                border: '1px solid antiquewhite',
              },
            }}
          >
            {`Open Requests for ${community.name}`}
          </Button>
        </Link>
      </header>
      <CommunitySubmissions communityObj={community} />
    </Paper>
  );
}
