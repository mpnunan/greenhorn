import { Paper } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import UserSavedSubmissions from '../../components/user/UserSavedSubmissions';

export default function SavedSubmissions() {
  const { user } = useAuth();

  return (
    <Paper
      sx={{
        bgcolor: 'rgb(5, 50, 5)',
        width: '100%',
        minHeight: 'fit-content',
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
