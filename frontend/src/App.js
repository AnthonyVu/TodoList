import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Todos from './components/Todos';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Logo from './components/Logo';
import todolistService from './services/todolistService';
import UpdateForm from './components/UpdateForm';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import { Button, ButtonGroup, Container, Grid } from '@mui/material';

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [todos, setTodos] = useState([]);
  const [firstSignOn, setFirstSignOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
        setFirstSignOn(true);
      } catch (e) {
        console.log(e.message);
      }
    };
      
    getAccessToken();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    const getTodos = async () => {
      if(!firstSignOn) return;
      const res = await todolistService.getAllTodos(accessToken, user.email);
      setTodos(res);
    }
    getTodos();
  }, [firstSignOn]);

  if(isAuthenticated) {
    return (
      <div>
        <Container maxWidth={'xl'} >
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <Logo variant={'h4'}/>
            </Grid>
            <Grid item xs={6} align='right'>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={() => navigate('/')}>Todos</Button>
                <Button onClick={() => navigate('/profile')}>Profile</Button>
                <LogoutButton />
              </ButtonGroup>
            </Grid>
        </Grid>
        </Container>

        <Routes>
          <Route path='/' element={<Todos todos={todos} setTodos={setTodos} user={user} token={accessToken} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/todos/:id' element={<UpdateForm token={accessToken} todos={todos} setTodos={setTodos} user={user} />} />
        </Routes>
      </div>
      
    );
  }
  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={0}>
          <Grid 
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '80vh' }}>
              <Logo variant={'h1'}/>
              <LoginButton />
          </Grid>
      </Grid>
    </Container>
  );
}

export default App;
