import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Paper } from '@mui/material';
import { getSingleCommunity } from '../../../api/communityData';
import CommunityRequests from '../../../components/communities/CommunityRequests';

export default function CommunityRequestsPage() {
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
        <h1>{`Open requests for the ${community.name} community`}</h1>
        <h3>Lend a hand</h3>
        <Link href={`/communities/${communityId}`} passHref>
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
            {`Back to ${community.name}`}
          </Button>
        </Link>
      </header>
      <CommunityRequests communityObj={community} />
    </Paper>
  );
}
