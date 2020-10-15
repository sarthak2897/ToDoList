import React,{useState} from 'react';
import './App.css';
import Body from './Body';
import CreateTask from './CreateTask';
import Profile from './Profile';

function App() {
  const [newTask,setNewTask] = useState(false);
  
  const createNewTaskHandler = () => {
      setNewTask(!newTask);
      console.log("createNewTaskHandler method called");
  }

  return (
    <div className="App">
      <Profile/>
      <Body  task={newTask}/>
      <CreateTask  task={newTask} taskExec={createNewTaskHandler}/>
    </div>
  );
}

export default App;
