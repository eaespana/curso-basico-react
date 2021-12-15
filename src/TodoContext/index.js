import React from 'react';
import {useLocalStorage} from '../TodoContext/useLocalStorage'; 

const TodoContext = React.createContext();

function TodoProvider(props){

    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error
    } = useLocalStorage('TODOS_V1',[]);  
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal,setOpenModal] = React.useState(false);

    const competedTodos = todos.filter(todo => !!todo.completed).length;
    const totalTodos = todos.length;
    
    let searchedTodos = [];
    
    if (!searchValue.length >= 1) {
        searchedTodos = todos;
    } else {
        searchedTodos = todos.filter(todo => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
        });
    }
    
    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        if(!newTodos[todoIndex].completed){
        newTodos[todoIndex].completed = true;
        }else{
        newTodos[todoIndex].completed = false;
        }
        
        saveTodos(newTodos);
    }

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text,
        });        
        saveTodos(newTodos);
    }
    
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex,1);    
        saveTodos(newTodos);
    }

    return (
        <TodoContext.Provider value={{
            error,
            loading,
            totalTodos,
            competedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            addTodo,
            deleteTodo,
            openModal,
            setOpenModal
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export {TodoContext, TodoProvider};