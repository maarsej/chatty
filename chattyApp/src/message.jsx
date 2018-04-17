import React, { Component } from 'react'; //can do because of babel, not avail in nodejs yet

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userStyle: { color: this.props.color },
        }
    }

    checkForImage() {
        let validFiles = [".jpg", ".png", ".gif"]
        let strArr = this.props.content.split(' ')
        let url = "";
        let index = -1;
        strArr.forEach(str => {
            if (validFiles.includes(str.substring(str.length - 4))) {
                console.log('in here')
                console.log(str);
                index = strArr.indexOf(str)
                url = str;
            }
        });
        if (url) {
            strArr.splice(index, 1)
            let newString = strArr.join(' ');
            return [url, newString];
        } else {
            return false;
        }
    }

    render() {
        if (this.props.type == "incomingMessage") {
            let img = this.checkForImage()[0];
            let newContent = this.checkForImage()[1];
            console.log(img)
            console.log(newContent)

            if (img) {
                return (
                    <div className="message">
                        <span style={this.state.userStyle} className="message-username">{this.props.username}</span>
                        <div className="message-content"> <div>{newContent} </div>
                            <div> <img className="userImage" src={img} /> </div> </div>
                    </div>
                );
            } else {
                return (
                    <div className="message">
                        <span style={this.state.userStyle} className="message-username">{this.props.username}</span>
                        <span className="message-content">{this.props.content}</span>
                    </div>

                );
            }
        } else if (this.props.type == "incomingNotification") {
            return (
                <div className="notification">
                    <span className="notification-content">{this.props.content}</span>
                </div>
            );
        }
    }
}
export default Message;