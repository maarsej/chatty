import React, { Component } from 'react';

class Chatbar extends Component {
    constructor(props) {
        super(props);

    }

    handleMessage = (event) => {
        if (event.key == 'Enter') {

            let message = { type: 'postMessage', content: event.target.value, username: this.props.user }
            this.props.newMessage(message)
            event.target.value = "";
        }
    }
    handleUserChange = (event) => {
        if (event.key == 'Enter') {
            let oldUser = this.props.user
            let newUser = event.target.value;
            let outgoingNotification = { "type": "postNotification", "content": `${oldUser} has changed their name to ${newUser}`, "username": newUser }
            this.props.newUsername(outgoingNotification);
        }
    }

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" type="text" defaultValue={this.props.user} onKeyPress={this.handleUserChange} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleMessage} />
            </footer>
        );
    }
}
export default Chatbar;