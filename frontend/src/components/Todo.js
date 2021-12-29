import todolistService from '../services/todolistService';
import { Container, Typography, Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';
import UpdateForm from './UpdateForm';

const Todo = ({todo, token, todos, setTodos, user}) => {
    const [updateClicked, setUpdateClicked] = useState(false);

    const deleteTodo = async () => {
        await todolistService.deleteTodo(token, todo.id);
        setTodos(todos.filter(t => t.id !== todo.id));
    }

    if(updateClicked) {
        return <UpdateForm token={token} todo={todo} todos={todos} setTodos={setTodos} user={user} updateClicked={updateClicked} setUpdateClicked={setUpdateClicked}/>
    }

    return (
        <Container maxWidth={'lg'} align="left" sx={{
            mt: 2, 
            boxShadow: 3, 
            p: 2, 
            borderRadius: 1, 
            backgroundColor: (todo.priority === 'low') ? '#a0ff99' : ((todo.priority === 'medium') ? '#ffe37d' : '#e66e7e')}}>
            <Typography variant={'body1'}><b>Title:</b> {todo.title}</Typography>
            <Typography variant={'body1'} sx={{wordWrap: 'break-word'}}><b>Description:</b> {todo.description}</Typography>
            <Typography variant={'body1'}><b>Due Date:</b> {todo.dueDate}</Typography>
            <Typography variant={'body1'}><b>Priority:</b> {todo.priority}</Typography>
            <Container align="right">
                <ButtonGroup size="small" aria-label="small button group">
                    <Button variant={'contained'} color={'error'} onClick={deleteTodo}>Delete</Button>
                    <Button variant={'contained'} onClick={() => setUpdateClicked(!updateClicked)}>Update</Button>
                </ButtonGroup>
            </Container>
        </Container>
    );
}

export default Todo;