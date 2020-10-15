import { Snackbar } from '@material-ui/core';
import React,{useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './CreateTask.css';
import Input from './Input';
import Axios from 'axios';
import {format} from 'date-fns';
//import {KeyboardTimePicker} from '@material-ui/pickers';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/entry';
const CreateTask = (props) => {
    const [date,setDate] =useState(new Date());
    const [time,setTime] = useState('10:00');
    const [task,setTask] = useState({
        id: '',
        title : '',
        description : '',
        taskComplete : false,
        date : format(date,"EEEE do,MMMM y"),
        time : time
    });
    const [createTaskComplete,setcreateTaskComplete] = useState(false);
    const dateChangeHandler = date => {
        setDate(date);
        setTask({
            ...task,
            date : format(date,"EEEE do,MMMM y")
        });
    }
    const timeChangeHandler = time => {
        setTime(time);
        setTask({
            ...task,
            time : time
        });
    }
    const createNewTask = async () => {
        await Axios.post("https://to-do-list-584f0.firebaseio.com/tasks.json",task);
        setcreateTaskComplete(true);
        console.log(props);
        props.taskExec();
        
    }

    const taskTitleHandler = event => {
           setTask({
               ...task,
               id : task.title+Math.floor(Math.random() * 10),
               title : event.target.value
           }); 
    }
    const taskDescriptionHandler = event => {
        setTask({
            ...task,
            description : event.target.value
        });
    }
    //console.log(task);
    return (
        <div className="task">
            <h3>Create a new task</h3>
            <Calendar value={date} onChange={dateChangeHandler} />
            <Input type="text" change={taskTitleHandler}/> 
            <Input type="textarea" change={taskDescriptionHandler}/>
            {/* <KeyboardTimePicker label="Select time" value={date} onChange={timeChangeHandler}/> */}
            Time : <TimePicker value={time} onChange={timeChangeHandler} className="time"/>
            <button className="task__create" onClick={() => createNewTask()}>Create Task</button>
            {/* <Snackbar open={createTaskComplete} message="New task created!" 
            autoHideDuration={6000} /> */}
        </div>
    )
} 

export default CreateTask
