import React, { Component } from 'react'; //can do because of babel, not avail in nodejs yet
import Chatbar from './chatbar.jsx';
import MessageList from './messagelist.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: [],
      userCount: 0
    };

  }
  
  componentDidMount() {
    this.socket = new WebSocket("ws:localhost:3001");
    // wait for message and parse it and push it and set state
    this.socket.onmessage = (event) => {
      let incomingData = JSON.parse(event.data);
      const messages = this.state.messages.concat(incomingData)
      switch (incomingData.type) {
        case "incomingMessage":
          this.setState({ messages: messages })
          break;
        case "incomingNotification":
          this.setState({ messages: messages })
          break;
        case "userUpdate":
          let userCount = incomingData.userCount;
          this.setState({userCount: userCount})
          break;
      }
    }
  }
  _newMessage = (incomingMessage) => {
    let messageString = JSON.stringify(incomingMessage)
    this.socket.send(messageString);
  }
  _newUsername = (incomingNotification) => {
    this.setState({ currentUser: incomingNotification.username })
    let notificationString = JSON.stringify(incomingNotification)
    this.socket.send(notificationString);

  }

  render() {
    return (
      <div className='app-container'>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-usercount">{this.state.userCount} Users Online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <Chatbar user={this.state.currentUser}
          newMessage={(message) => this._newMessage(message)}
          newUsername={(user) => this._newUsername(user)} />
      </div>
    );
  }
}
export default App;
