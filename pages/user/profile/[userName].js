import UserProfile from '../../../components/user/UserProfile';
import { useAuth } from '../../../utils/context/authContext';

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <section className="profilePage">
      <UserProfile key={user.uid} userObj={user} />
    </section>
  );
}
