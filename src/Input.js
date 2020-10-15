import React from 'react'
import './Input.css';


const Input = (props) => {
    let input = null;
    if(props.type === 'text'){
        input=<input type="text" value={props.value} placeholder="Task Title" className="task__title" id="title" onChange={props.change}/>
    }
    else{
        input=<textarea   value={props.value} placeholder="Task Description" className="task__desc" onChange={props.change}/>
    }
    return (
        <React.Fragment>
            {input}
        </React.Fragment>
        
    )
}

export default Input
