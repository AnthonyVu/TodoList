import axios from 'axios'

const baseURL = 'http://143.110.222.1:8080/api/todos'

const getAll = async () => {
    console.log('getting all todos')
    const req = await axios.get(baseURL);
    return req.data;
}

const addTodo = async (object) => {
    console.log('adding todo')
    const req = await axios.post(baseURL, object)
    // console.log(req.status)
    return req.data
}

const removeTodo = async (id) => {
    console.log('deleting todo')
    const req = await axios.delete(`${baseURL}/${id}`)
    return req.data
}

const updateTodo = async (id, object) => {
    console.log('updating todo')
    const req = await axios.put(`${baseURL}/${id}`, object)
    return req.data
}

const deleteAllTodos = async () => {
    console.log('deleting all todos')
    const req = await axios.delete(baseURL)
    return req.data
}

const getById = async (id) => {
    console.log('getting todo by id')
    const req = await axios.get(`${baseURL}/${id}`)
    return req.data
}

const getByTitleContaining = async (title) => {
    console.log('getting all todos containing')
    const req = await axios.get(`${baseURL}?title=${title}`)
    return req.data
}

export default { getAll, addTodo, removeTodo, updateTodo, deleteAllTodos, getById, getByTitleContaining }