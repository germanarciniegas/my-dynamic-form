import React from 'react';
import './App.css';
import DynamicForm from './components/DynamicForm/DynamicForm';

function App() {
  const[response, setResponse] = React.useState({});
  console.log(response)
  return (
    <div className='App'>
      <DynamicForm setResponse={setResponse}/>
      <div className='response'>{JSON.stringify(response)}</div>
    </div>
  );
}

export default App;
