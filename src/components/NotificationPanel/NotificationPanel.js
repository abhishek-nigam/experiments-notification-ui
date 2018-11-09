import React from 'react'
import './NotificationPanel.css'
import NotificationEntry from '../NotificationEntry/NotificationEntry';

const notificationPanel = props => (
    <div className="notification-panel">
        <div className="notification-panel-header">
            <span>Notifications</span>
            {props.unread > 0 ? <span className="badge-count-panel">{props.unread}</span> : null}
            <span className="dismiss-all"><i className="fas fa-circle"></i></span>
            <span className="caret-up"><i class="fas fa-caret-up"></i></span>
        </div>
        <div className="notification-panel-content">
            <div className="notification-scroll-container">
                {props.notifications.map(notification => <NotificationEntry
                    key={notification.id}
                    author_image={notification.author_image}
                    author_name={notification.author_name}
                    author_action={notification.author_action} />)}
            </div>
        </div>
    </div>
)

export default notificationPanel;