import { Paper } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import UserSavedSubmissions from '../../components/user/UserSavedSubmissions';

export default function SavedSubmissions() {
  const { user } = useAuth();

  return (
    <Paper
      sx={{
        bgcolor: 'rgba(5, 50, 5, .6)',
        width: '100%',
        height: '100%',
      }}
    >
      <header>
        <h1>
          {`${user.displayName}'s Saved Submissions`}
        </h1>
      </header>
      <UserSavedSubmissions />
    </Paper>

  );
}
