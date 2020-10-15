import React from 'react'
import './Modal.css';

const Modal = (props) => {
    return (
        <React.Fragment>
            <div className={props.show ? "backdrop" : null} onClick={props.close}></div>
            <div className="modal"
            style={
                {
                    transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity : props.show ? '1' : '0'
                }
            }> 
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default Modal
