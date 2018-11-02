import React from 'react';
import './NotificationEntry.css';

export default params => (
    <div className="notification-entry">
        <div className="notification-author-image">
            <img src={params.author_image} alt="" />
        </div>
        <div className="notification-author-action">
            <span>{params.author_name}&nbsp;{params.author_action}</span>
        </div>
    </div>
)