import axios from 'axios'
import env from "react-dotenv";

const baseUrl = (process.env.NODE_ENV === "production") ? env.PROD_URL : env.DEV_URL;

const getAllTodos = async (token, email) => {
    const response = await axios.get(`${baseUrl}/email/${email}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}

const getTodo = async (token, id) => {
    const response = await axios.get(`${baseUrl}/id/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}

const addTodo = async (token, todo) => {
    const response = await axios.post(baseUrl, todo, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}

const deleteTodo = async (token, id) => {
    const response = await axios.delete(`${baseUrl}/id/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}

const updateTodo = async(token, id, todo) => {
    const response = await axios.put(`${baseUrl}/id/${id}`, todo, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
}

const exportedObject = {
    getAllTodos,
    getTodo,
    addTodo,
    deleteTodo,
    updateTodo,
};

export default exportedObject;