import Todo from './Todo';
import AddForm from './AddForm';
import { Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

const Todos = ({todos, setTodos, token, user}) => {
    
    if(!todos.length) {
        return (
            <Container maxWidth={'xl'}>
                <Grid container spacing={2}>
                    <Grid 
                        item xs={8} 
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '80vh' }}>
                        <Typography variant='h2' xs={{mt: 2}} sx={{color: '#aeb0b0'}}>Your schedule is completely clear!</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <AddForm token={token} todos={todos} setTodos={setTodos} user={user}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
    return (
        <Container maxWidth={'xl'}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    {todos.map(todo => 
                        <Todo key={todo.id} todo={todo} token={token} todos={todos} setTodos={setTodos} user={user}/>
                    )}
                </Grid>
                <Grid item xs={4}>
                    <AddForm token={token} todos={todos} setTodos={setTodos} user={user}/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Todos;