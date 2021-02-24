import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, useHistory, useLocation
} from "react-router-dom"
import './App.css';
import itemService from './utils';

/*
clean up form
add another view to update todos
add filtering options by each column 
deploy
*/
const Header = () => {
  return(
    <div className="Header">
      <h1>TodoList</h1>
    </div>
  );
}

const ItemList = (props) => {
  if(props.items.length == 0) {
    return (
      <div></div>
    )
  }

  const handleDeleteAll = () => {
    itemService.deleteAllTodos().then(()=> {
      console.log('deleted all todos successfully')
      props.setItems([])
    })
  }

  return(
    <div className="itemList">
      <h2>To Dos</h2>
      <button onClick={handleDeleteAll}>Delete All</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {
          props.items.map((item) =>
            <Item key={item.id} item={item} items={props.items} setItems={props.setItems}/>
          )        
          }
        </tbody>
      </table>
    </div>
  );
}

const Item = ({item, items, setItems}) => {

  const history = useHistory();

  const handleDelete = () => {
    itemService.removeTodo(item.id).then(() => {
      console.log('deleted item successfully')
      setItems(items.filter(t => t.id !== item.id))
    })
  }

  const handleEdit = () => {
    itemService.getById(item.id).then((resp) => {
      history.push({
        pathname:'/edit', 
        item: {resp},
        items: {items},
        setItems: {setItems}
      })
    })
  }

  return(
    <tr>
      <td>{item.title}</td>
      <td>{item.date}</td>
      <td>{item.priority}</td>
      <td>
        <div className="buttonParent">
          <div className="editButton">
            <button onClick={handleEdit}>edit</button>
          </div>
          <div className="deleteButton">
            <button onClick={handleDelete}>delete</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

const EditForm = () => {

  const location = useLocation();
  const history = useHistory();
  const item = location.item.resp
  const [ newTitle, setNewTitle ] = useState(item.title)
  const [ newDueDate, setNewDueDate ] = useState(item.date)
  const [ newPriority, setNewPriority ] = useState(item.priority)

 const handleSubmit = (event) => {
   event.preventDefault()
   
   const newItem = {
     title: newTitle,
     date: newDueDate,
     priority: newPriority
   }

   itemService.updateTodo(item.id, newItem).then(() => {
     console.log('updated item successfully')
     location.setItems.setItems(location.items.items.map(el => (el.id == item.id) ? {id: item.id,...newItem} : {...el}))
     history.push('/')
   })
 }

  return(
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
        Title (50 characters max):
        </div>
        <div>
        <input type="text" name="title" maxLength="50" value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/>
        </div>
        <div>
        Due Date:
        </div>
        <div>
        <input type="date" name="date" value={newDueDate} onChange={(event) => setNewDueDate(event.target.value)}/>
        </div>
        <div>
        Priority:
        </div>
        <div>
         <select value={newPriority} onChange={(event) => setNewPriority(event.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">save</button>
        <button onClick={() => history.push('/')}>cancel</button>
      </form>
    </div>
  )
}

const Form = (props) => {
 const [ newTitle, setNewTitle ] = useState('')
 const [ newDueDate, setNewDueDate ] = useState('')
 const [ newPriority, setNewPriority ] = useState('Low')


 const handleSubmit = (event) => {
   event.preventDefault()
   
   const newItem = {
     title: newTitle,
     date: newDueDate,
     priority: newPriority
   }

   itemService.addTodo(newItem).then((resp) => {
     console.log('added item successfully')
     const newItems = props.items.concat(resp)
     props.setItems(newItems)
   })
 }

  return(
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
        Title (50 characters max):
        </div>
        <div>
        <input type="text" name="title" maxLength="50" value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/>
        </div>
        <div>
        Due Date:
        </div>
        <div>
        <input type="date" name="date" value={newDueDate} onChange={(event) => setNewDueDate(event.target.value)}/>
        </div>
        <div>
        Priority:
        </div>
        <div>
         <select value={newPriority} onChange={(event) => setNewPriority(event.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function App() {
  const [ items, setItems ] = useState([])
  useEffect(() => {
    itemService.getAll().then(
      items => setItems(items)
    )
  },[])

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path='/edit'>
            <EditForm />
          </Route>
          <Route path='/'>
            <Form items={items} setItems={setItems}/>
            <ItemList items={items} setItems={setItems}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
