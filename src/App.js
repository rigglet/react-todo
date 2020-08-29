import React, {useState, useEffect} from 'react';
import './App.css';

//importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  
  //run once when the app first loads
  useEffect(()=>{
    getLocalTodos();
  },[]);

  //use effect
  useEffect(()=> {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true)); 
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false)); 
        break;
      default:
        setFilteredTodos(todos);
        break; 
      }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let localTodo = JSON.parse(localStorage.getItem('todos'));
      setTodos(localTodo)
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Neil's Todo List</h1>
      </header>
      <Form setStatus={setStatus} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText}/>
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos}/>
    </div>
  );
}

export default App;
