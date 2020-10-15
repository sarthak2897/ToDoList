import React,{useEffect,useState} from 'react'
import './Body.css'
import Axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from './Modal';
import { Checkbox } from '@material-ui/core';
import Input from './Input';

const Body = (props) => {
    const [tasks,setTasks]  = useState([]);
    const [rawData,setRawData] = useState(); 
    const [open,setOpen] = useState(false);
    //const [edit,setEdit] = useState(false);
    //const [editData,setEditData] = useState({});
    const [loading,setLoading] = useState(false);
    const [activeId,setActiveId] = useState(null);
    const [taskUpdate,setTaskUpdate] = useState(false);
    useEffect(() => {
        setLoading(true);
        //setTaskUpdate(true);
       const fetchTasks = async () => {
            const {data} = await Axios.get("https://to-do-list-584f0.firebaseio.com/tasks.json")
            //console.log(data);
            setRawData(data);
            const fetchedTasks = [];
            for(let task in data){
                fetchedTasks.push(data[task]);
            }
            //console.log(fetchedTasks);
            setTasks(fetchedTasks);
            setLoading(false);
            //setTaskUpdate(false);
        }
        fetchTasks();
    }, [props.task,taskUpdate]);

    const toggleCompleteTaskHandler = async id => {
        const updatedTasks = [...tasks];
        const taskIndex = updatedTasks.findIndex(task => task.id === id);
        updatedTasks[taskIndex].taskComplete = !updatedTasks[taskIndex].taskComplete;
        setTasks(updatedTasks);
        let idToBeModified = null;
        for(let key in rawData) {
            if(rawData[key].id === id){
                //rawData[key].taskComplete = !rawData[key].taskComplete;
                idToBeModified = key;
                break;
            }
        }
        if(idToBeModified !== null){
            await Axios.patch(`https://to-do-list-584f0.firebaseio.com/tasks/${idToBeModified}.json`,
            {taskComplete : rawData[idToBeModified].taskComplete});
        }
    }

    const deleteTaskHandler = async id => {
        let idToBeDeleted = null;
        for(let key in rawData){
            if(rawData[key].id === id){
                delete rawData[key];
                idToBeDeleted = key;
                break;
            }
        }
        console.log(rawData);
        closeDialogBox();
        if(idToBeDeleted != null){
            await Axios.delete(`https://to-do-list-584f0.firebaseio.com/tasks/${idToBeDeleted}.json`);
        }
        setTaskUpdate(!taskUpdate);
    }
    //console.log(tasks);
    // const setEditableData = id => {
    //     const updatedTasks = [...tasks];
    //     const filteredTask = updatedTasks.filter(task => task.id === id);
    //     console.log(filteredTask[0]);
    //     setEditData(filteredTask[0]);
    //     openEditBox(id);
    // }
    // const openEditBox = id => {
    //     setActiveId(id);
    //     console.log(editData);
    //     setEdit(true);
    // }
    
    // const closeEditBox = () => {
    //     setEdit(false);
    // }

    const openDialogBox = (id) => {
        setActiveId(id);
        setOpen(true);
    }
    const closeDialogBox = () => {
        setOpen(false);
    }
    const totalCompletedTasks = () =>{
        let completedTasks = 0;
        tasks.forEach(task =>{ 
            if(task.taskComplete === true)
                ++completedTasks;    
            });
               return completedTasks; 
    }
    const updateEditedTasks = () => {

    }
    const formatTime = time => {
        if(time !== ''){
            const divide = time.split(':');
            //console.log(divide);
            if(divide[0] >0 && divide[0] < 12){
                return time+' AM';
            }    
            else if(divide[0] > 12){
                return divide[0]-12+':'+divide[1]+'PM';
            }
            else if(divide[0] === '00') {
                return '12:'+divide[1]+'AM';
            }
            else if(divide[0] === '12'){
                return '12:'+divide[1]+'PM';
            }
        }
    }

    let taskList = <CircularProgress className="spinner" style={{color : "#053D5D"}}/>;
    
    if(!loading){
        taskList = (tasks.map(task =>{
            return (
                <React.Fragment key={task.id}>
                <div className={task.taskComplete ? "task__init task__complete" : "task__init"}>
                    <div className="task__info">
                        <div>
                        <Checkbox
                            checked={task.taskComplete}
                            onChange={toggleCompleteTaskHandler.bind(this,task.id)}
                            style={{color : '#053D5D'}}
                        />
                        </div>
                        <div>
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                        </div>
                    </div>
                    
                    <div className="task__date">
                            <p>{formatTime(task.time)}</p>
                            <p>{task.date}</p>
                    </div>

                    <div className="task__edit">
                        {/* <EditIcon className="task__editIcon" onClick={setEditableData.bind(this,task.id)}/> */}
                        <DeleteIcon className="task__deleteIcon" onClick={openDialogBox.bind(this,task.id)}/>
                        
                    </div>
                </div> 
                <hr className="task__divider"/>
                </React.Fragment>

            )}
            )
        );
            }

    return (
        <React.Fragment>
            <Modal show={open} close={closeDialogBox}>
                <h3 className="task__dialogHeading">Are you sure you want to delete this task?</h3>
                <div className="task__dialogBtn">
                    <button style={{margin : '0 10px',cursor: 'pointer'}} onClick={deleteTaskHandler.bind(this,activeId)}>Yeah!</button>
                    <button onClick={closeDialogBox} style={{cursor:'pointer'}}>Oops! Go back!</button>
                </div>
            </Modal>
            {/* <Modal show={edit} close={closeEditBox}>
                <h3 className="edit__heading">Edit task</h3>
                <form onSubmit={updateEditedTasks}>
                    <Input type="text" value={editData.title} onChange={}/>
                    <Input value={editData.description}/> 
                </form>
            </Modal>      */}
        <div className="body">
            <div className="heading">
                <h3>My Tasks</h3>
                <h4>Completed Tasks : {totalCompletedTasks()}/{tasks.length}</h4>
            </div>
            
            {taskList}
           
        </div>
        </React.Fragment>
    )
}

export default Body
