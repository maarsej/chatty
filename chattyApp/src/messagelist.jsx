import React, { Component } from 'react'; //can do because of babel, not avail in nodejs yet
import Message from './message.jsx';

class MessageList extends Component {
    constructor(props) {
        super(props);
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        return (
            <main className="messages">
                {this.props.messages.map(message => {
                    return (
                        <Message key={message.id.toString()}
                            type={message.type}
                            username={message.username}
                            content={message.content}
                            color={message.color} />
                    )
                })
                }
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </main>
        );
    }
}
export default MessageList;