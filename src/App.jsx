import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import "../styles/application.scss"

class App extends Component {
  constructor(){
    super();
    this.state = {
      messageID: 1,
      currentUser:"TestUser",
      messages:[
        {
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1",
          id: 123
        },
        {
          type: "incomingMessage",
          content: "I enjoy free food.",
          username: "SuperMan",
          id: 124
        }
      ]
    };
  }

  _addMessage = (contents) => {
    const mID = this.state.messageID;
    const newMessage = {id: mID, username: this.state.currentUser, content: contents};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages, messageID: mID + 1});
  };

  componentDidMount(){
    const ws = new WebSocket('ws://0.0.0.0:3000');
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this._addMessage} />
      </div>
    );
  }
}
export default App;
