import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import NotificationPanel from './components/NotificationPanel/NotificationPanel';

class App extends Component {
  state = {
    isNotificationOpen: false,
    noOfUnreadNotifications: 10,
    notificationss: [],
    notifications: [
      {
        id: '001',
        author_name: 'Abhishek Nigam',
        author_action: 'recently liked your photo',
        author_image: 'https://i0.wp.com/www.sardiniauniqueproperties.com/wp-content/uploads/2015/10/square-profile-pic.jpg',
        unread: true
      },
      {
        id: '002',
        author_name: 'Ashish Nigam',
        author_action: 'commented on your post',
        author_image: 'https://media.creativemornings.com/uploads/user/avatar/49419/Bechtel_Profile_Square.jpg',
        unread: false
      },
      {
        id: '003',
        author_name: 'Aakash Chawla',
        author_action: 'recenly posted in your group',
        author_image: 'https://cdn.moble.com/w/857/145232/file/test-profile-image.jpg',
        unread: false
      },
      {
        id: '004',
        author_name: 'Aakash Chawla',
        author_action: 'recenly posted in your group',
        author_image: 'https://cdn.moble.com/w/857/145232/file/test-profile-image.jpg',
        unread: false
      }
    ]
  }

  // Handlers
  toggleIsNotificationOpen = () => {
    this.setState(prevState => ({
      ...prevState,
      isNotificationOpen: !prevState.isNotificationOpen,
      noOfUnreadNotifications: 0
    }));
  }

  render() {
    return (
      <div className="App">
        <Navbar
          isOpen={this.state.isNotificationOpen}
          toggleOpen={this.toggleIsNotificationOpen}
          unread={this.state.noOfUnreadNotifications}
        />
        <NotificationPanel
          isOpen={this.state.isNotificationOpen}
          unread={this.state.noOfUnreadNotifications}
          notifications={this.state.notifications}
        />
      </div>
    );
  }
}

export default App;
