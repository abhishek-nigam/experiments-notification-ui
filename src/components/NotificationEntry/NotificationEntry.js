import React from 'react';
import './NotificationEntry.css';

export default props => (
    <div className="notification-entry">
        <div className="notification-author-image">
            <img src={props.author_image} alt="" />
        </div>
        <div className="notification-author-action">
            <p>
                <span className="notification-author-name">{props.author_name}</span>&nbsp;<span>{props.author_action}</span>
            </p>
        </div>
        <div className="notification-dismiss">
            <i className="fas fa-circle" onClick={props.dismiss}></i>
        </div>
    </div>
)