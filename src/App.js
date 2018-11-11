import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import NotificationPanel from './components/NotificationPanel/NotificationPanel';

const baseUrl = 'http://localhost:3001';

class App extends Component {
  state = {
    isNotificationOpen: false,
    noOfUnreadNotifications: 0,
    notifications: [],
  }

  // Lifecycle Methods
  componentDidMount = () => {
    this.getNotifications();
  }

  // Handlers
  toggleIsNotificationOpen = () => {

    this.setState(prevState => {

      if (prevState.isNotificationOpen === false) {
        return ({
          ...prevState,
          isNotificationOpen: true
        });

      } else {

        this.readNotifications(prevState.notifications);
        const notifications = prevState.notifications.map(el => {
          el.unread = false;
          return el;
        });

        return ({
          ...prevState,
          isNotificationOpen: false,
          noOfUnreadNotifications: 0,
          notifications: notifications
        });
      }

    });
  }

  syncButtonClickHandler = () => {
    this.getNotifications();
  }

  // Helper Methods
  getNotifications = () => {
    fetch(`${baseUrl}/getNotifications`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {

        console.log(res);

        let notifications = res.data;
        let unread = 0;

        for (let i = 0; i < notifications.length; i++) {
          if (notifications[i].unread === true)
            unread += 1;
        }

        this.setState({
          noOfUnreadNotifications: unread,
          notifications: notifications,
          isNotificationOpen: false
        });

      });
  };

  dismissAllHandler = () => {
    this.setState(prevState => {
      this.dismissNotifications(prevState.notifications);
      return ({
        ...prevState,
        noOfUnreadNotifications: 0,
        notifications: [],
      });
    });
  }

  dismissOneHandler = (notification) => {
    this.setState(prevState => {
      this.dismissNotifications(notification, true);
      const notifications = prevState.notifications.filter(el => el._id !== notification._id);

      return ({
        ...prevState,
        noOfUnreadNotifications: prevState.noOfUnreadNotifications - 1,
        notifications: notifications
      });
    });
  }

  readNotifications = (notifications) => {
    let notification_ids = notifications.map(el => el._id);
    fetch(`${baseUrl}/readNotifications`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ notifications: notification_ids })
    })
      .then(res => {
        console.log(res);
        console.log(`Read notifications ${notification_ids}`)
      });
  };

  dismissNotifications = (notifications, isOne = false) => {
    // console.log('received in function', notifications);

    let notification_ids = isOne ? [notifications._id] : notifications.map(el => el._id);


    let obj_to_send = { notifications: notification_ids };
    console.log('sending object', obj_to_send);

    fetch(`${baseUrl}/dismissNotifications`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(obj_to_send)
    })
      .then(res => {
        console.log(res);
        console.log(`Dismissed notifications ${notification_ids}`)
      });
  }

  render() {
    return (
      <div className="App">
        <Navbar
          isOpen={this.state.isNotificationOpen}
          toggleOpen={this.toggleIsNotificationOpen}
          unread={this.state.noOfUnreadNotifications}
          sync={this.syncButtonClickHandler}
        />
        <NotificationPanel
          isOpen={this.state.isNotificationOpen}
          unread={this.state.noOfUnreadNotifications}
          notifications={this.state.notifications}
          dismissAll={this.dismissAllHandler}
          dismissOne={this.dismissOneHandler}
        />
      </div>
    );
  }
}

export default App;
