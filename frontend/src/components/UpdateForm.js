import { useState } from "react";
import todolistService from '../services/todolistService';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Container, FormControl, TextField, Typography, Select, MenuItem, Button, InputLabel } from "@mui/material";
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const UpdateForm = ({token, todos, setTodos, user}) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();

    const [title, setTitle] = useState(state.title);
    const [description, setDescription] = useState(state.description);
    const [dueDate, setDueDate] = useState(state.dueDate);
    const [priority, setPriority] = useState(state.priority);

    const onSubmit = async (e) => {
        e.preventDefault();
        const updatedTodo = {
            id,
            title,
            description,
            dueDate,
            priority,
            email: user.email,
        }

        const res = await todolistService.updateTodo(token, id, updatedTodo);
        const newTodos = todos.map(t => t.id === Number(id) ? res : t);
        setTodos(newTodos);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('low');
        navigate('/');
    }

    return (
        <Container maxWidth={'xs'} sx={{mt: 2, boxShadow: 3, p: 2, borderRadius: 1, backgroundColor: '#bff4ff'}}>
            <Typography variant={"h3"}>Update Todo</Typography>
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
        // <div>
        //     <h1>Update Todo</h1>
        //     <form onSubmit={onSubmit}>
        //         <div>
        //             <label>
        //                 Title:
        //                 <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        //             </label>
        //         </div>
        //         <div>
        //         <label>
        //             Description:
        //             <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        //         </label>
        //         </div>
        //         <div>
        //             <label>
        //                 Due Date:
        //                 <input type="date" name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
        //             </label>
        //         </div>
        //         <div>
        //             <label>
        //                 Priority:
        //                 <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        //                     <option value="low">low</option>
        //                     <option value="medium">medium</option>
        //                     <option value="high">high</option>
        //                 </select>
        //             </label>
        //         </div>
        //         <input type="submit" value="Submit" />
        //     </form>
        // </div>
    );
}

export default UpdateForm;