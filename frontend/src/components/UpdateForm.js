import { useState } from "react";
import todolistService from '../services/todolistService';
import { Container, FormControl, TextField, Typography, Select, MenuItem, Button, InputLabel } from "@mui/material";
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const UpdateForm = ({token, todo, todos, setTodos, user, setUpdateClicked, updateClicked}) => {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState(todo.priority);

    const onSubmit = async (e) => {
        e.preventDefault();
        const updatedTodo = {
            id: todo.id,
            title,
            description,
            dueDate,
            priority,
            email: user.email,
        }

        const res = await todolistService.updateTodo(token, todo.id, updatedTodo);
        const newTodos = todos.map(t => t.id === Number(todo.id) ? res : t);
        setTodos(newTodos);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('low');
        setUpdateClicked(!updateClicked);
    }

    return (
        <Container maxWidth={'md'} sx={{mt: 2, boxShadow: 3, p: 2, borderRadius: 1, backgroundColor: '#bff4ff'}}>
            <Typography variant={"h3"}>Update Todo</Typography>
            <FormControl fullWidth={true}>
                <TextField
                    label="New Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{mt: 2}}
                    fullWidth
                />
                <TextField
                    label="New Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{mt: 2, mb: 2}}
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        disablePast
                        openTo="year"
                        views={['year', 'month', 'day']}
                        label={`Enter a new date! Previous due date: ${todo.dueDate}`}
                        value={dueDate}
                        onChange={(newValue) => {
                            setDueDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                    
                </LocalizationProvider>
                <FormControl variant="standard" sx={{ mt: 2, mb: 2}} fullWidth>
                    <InputLabel>New Priority</InputLabel>
                    <Select
                        value={priority}
                        label="New Priority"
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <MenuItem value={"low"}>low</MenuItem>
                        <MenuItem value={"medium"}>medium</MenuItem>
                        <MenuItem value={"high"}>high</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setUpdateClicked(!updateClicked)}
                    >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    >
                    Submit
                </Button>
            </FormControl>
        </Container>
    );
}

export default UpdateForm;