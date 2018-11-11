import React from 'react';
import './Navbar.css';


const navbar = props => {

    let bellBackgroundClasses = "bell-background";
    if (props.isOpen) {
        bellBackgroundClasses += ' bell-dark-background'
    }

    return (
        <div className="navbar">
            <div className="navbar-item"></div>
            {props.fetching ? <div className="navbar-item fetching-text">Fetching...</div> : null}
            <div className="navbar-item" id="sync-item">
                <i className="fas fa-sync-alt" onClick={props.sync}></i>
            </div>
            <div className="navbar-item" id="bell-navbar-item">
                <div
                    className={bellBackgroundClasses}
                    onClick={props.toggleOpen}
                >
                    <i className="far fa-bell">
                        {props.unread > 0 ? <span className="badge-count">{props.unread}</span> : null}
                    </i>
                </div>
            </div>
        </div>
    )
}

export default navbar;