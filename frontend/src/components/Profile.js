import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";

const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <Container maxWidth={'xs'} align="center" justifyContent="center" sx={{mt: 2, p: 5, backgroundColor: '#beedfa', borderRadius: 1, boxShadow: 3,}}>
        <Typography variant='h4'>Currently Logged in</Typography>
        <Avatar variant={'circular'} sx={{width: 150, height: 150, m: 2}} alt="profile pic" src={user.picture} />
        <Typography variant='h5'>{user.name}</Typography>
        <Typography variant='h5'>{user.email}</Typography>
      </Container>
    </div>
  );
};

export default Profile;