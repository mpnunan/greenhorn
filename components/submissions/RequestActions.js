import { Button, CardActions } from '@mui/material';
import Link from 'next/link';

export default function RequestActions() {
  return (
    <CardActions
      sx={{
        justifyContent: 'center',
      }}
    >
      <Link href="/submission/submitNew" passHref>
        <Button>Provide an Answer</Button>
      </Link>
    </CardActions>
  );
}
