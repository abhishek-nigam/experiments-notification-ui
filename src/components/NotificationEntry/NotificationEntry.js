import React from 'react';
import './NotificationEntry.css';


export default props => {

    const style = {
        'color': props.unread ? '#444' : '#888'
    }

    return (
        <div className="notification-entry">
            <div className="notification-author-image">
                <img src={props.author_image} alt="" />
            </div>
            <div className="notification-author-action" style={style}>
                <p>
                    <span className="notification-author-name">{props.author_name}</span>&nbsp;<span>{props.author_action}</span>
                </p>
            </div>
            <div className="notification-dismiss">
                <i className="fas fa-circle" onClick={props.dismiss}></i>
            </div>
        </div>
    )
}