import { useState } from "react";
import todolistService from '../services/todolistService';
import { Container, FormControl, TextField, Typography, Select, MenuItem, Button, InputLabel } from "@mui/material";
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const AddForm = ({token, todos, setTodos, user}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [priority, setPriority] = useState('low');

    const onSubmit = async (e) => {
        e.preventDefault();
        const todo = {
            title,
            description,
            dueDate,
            priority,
            email: user.email,
        }

        const res = await todolistService.addTodo(token, todo);
        // add error handling here later for invalid inputs
        setTodos(todos.concat(res));
        setTitle('');
        setDescription('');
        setPriority('low');
    }

    return (
        <Container maxWidth={'xs'} sx={{mt: 2, boxShadow: 3, p: 2, borderRadius: 1, backgroundColor: '#bff4ff'}}>
            <Typography variant={"h3"}>Add Todo</Typography>
            <FormControl fullWidth={true}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{mt: 2}}
                    fullWidth
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{mt: 2, mb: 2}}
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        disableUnderline
                        disablePast
                        openTo="year"
                        views={['year', 'month', 'day']}
                        label="Month/Day/Year"
                        value={dueDate}
                        onChange={(newValue) => {
                            setDueDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                    
                </LocalizationProvider>
                <FormControl variant="standard" sx={{ mt: 2, mb: 2}} fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={priority}
                        label="Priority"
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <MenuItem value={"low"}>low</MenuItem>
                        <MenuItem value={"medium"}>medium</MenuItem>
                        <MenuItem value={"high"}>high</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
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

export default AddForm;