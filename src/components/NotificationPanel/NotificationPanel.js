import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './NotificationPanel.css'
import NotificationEntry from '../NotificationEntry/NotificationEntry';


const notificationPanel = props => {

    const notifications = props.notifications.length > 0 ? (
        <TransitionGroup className="notification-scroll-container">
            {props.notifications.map(notification =>
                <CSSTransition key={notification._id} timeout={300} classNames="notification">
                    <NotificationEntry

                        author_image={notification.author_image}
                        author_name={notification.author_name}
                        author_action={notification.author_action}
                        dismiss={() => { props.dismissOne(notification) }} />
                </CSSTransition>
            )}
        </TransitionGroup>
    ) : (
            <div className="notification-message">
                <span>All caught up!</span>
            </div>
        );

    return (
        <CSSTransition in={props.isOpen} unmountOnExit timeout={500} classNames="panel">
            <div className="notification-panel">
                <div className="notification-panel-header">
                    <span>Notifications</span>
                    {props.unread > 0 ? <span className="badge-count-panel">{props.unread}</span> : null}
                    <span className="dismiss-all" onClick={props.dismissAll}><i className="fas fa-circle"></i></span>
                    <span className="caret-up"><i className="fas fa-caret-up"></i></span>
                </div>
                <div className="notification-panel-content">
                    {notifications}
                </div>
            </div>
        </CSSTransition>
    );
}

export default notificationPanel;