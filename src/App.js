import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import NotificationPanel from './components/NotificationPanel/NotificationPanel';

const baseUrl = 'https://notifui.now.sh';

class App extends Component {

  state = {
    isNotificationOpen: false,
    noOfUnreadNotifications: 0,
    notifications: [],
  }

  ////////////////////
  // Lifecycle Methods
  ////////////////////

  componentDidMount = () => {
    this.getNotifications();
  }

  ///////////////////
  // Handlers Methods
  ///////////////////


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


  ///////////////////
  // Helper Methods
  ///////////////////

  getNotifications = () => {
    fetch(`${baseUrl}/getNotifications`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
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

  readNotifications = (notifications) => {
    let notification_ids = notifications.map(el => el._id);

    fetch(`${baseUrl}/readNotifications`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ notifications: notification_ids })
    })
      .then(res => {
        console.log(`Result: Success, Info: Read notifications ${notification_ids}`)
      })
      .catch(err => {
        console.log(`Result: Error, Info: ${err}`);
      });
  };

  dismissNotifications = (notifications, isOne = false) => {
    let notification_ids = isOne ? [notifications._id] : notifications.map(el => el._id);

    fetch(`${baseUrl}/dismissNotifications`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ notifications: notification_ids })
    })
      .then(res => {
        console.log(`Result: Success, Info: Dismissed notifications ${notification_ids}`)
      })
      .catch(err => {
        console.log(`Result: Error, Info: ${err}`);
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
