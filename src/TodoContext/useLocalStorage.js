import React from 'react';

function useLocalStorage(itemName,initialValue){

    const [error,setError] = React.useState(false);
    const [loading,setLoading] = React.useState(true);
    const [item,setItem] = React.useState(initialValue); 
    
    React.useEffect(() => {    
        setTimeout(() => {
          try {
            const localStorageItem = localStorage.getItem(itemName);
            let parseItem;
      
            if(!localStorageItem){
              localStorage.setItem(itemName, JSON.stringify(initialValue));
              parseItem = [];
            } else {
              parseItem = JSON.parse(localStorageItem);
            }
            setItem(parseItem);
            setLoading(false);
          } catch (err) {
            setError(err);
          }
        },1000);    
    },[]);
    
    const saveItem = (newTodos) => {
      try {
        const stringifiedTodos = JSON.stringify(newTodos);
        localStorage.setItem(itemName,stringifiedTodos);
        setItem(newTodos);
      } catch (err) {
        setError(err);
      }
    };
  
    return{
      item,
      saveItem,
      loading,
      error
    };
}

export {useLocalStorage};