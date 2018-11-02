import React from 'react'
import './NotificationPanel.css'
import NotificationEntry from '../NotificationEntry/NotificationEntry';

const notificationPanel = props => (
    <div className="notification-panel">
        <div className="notification-panel-header">
            <span>Notifications</span>
            {props.unread > 0 ? <span className="badge-count-panel">{props.unread}</span> : null}
        </div>
        <div className="notification-panel-content">
            <div className="notification-scroll-container">

            </div>
        </div>
    </div>
)

export default notificationPanel;