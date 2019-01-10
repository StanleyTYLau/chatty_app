import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';
import "../styles/application.scss"

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser:"Anon",
      fontColour:"",
      numUser: 0,
      messages:[] // messages coming from the server will be stored here as they arrive
    };
  }

  _addMessage = (contents) => {
    const newMessage = {
      username: this.state.currentUser,
      content: contents,
      fontColour: this.state.fontColour,
      type:'post-message'
    };

    this.socket.send(JSON.stringify(newMessage));
  };

  _addName = (newName) => {
    const oldName = this.state.currentUser;
    this.setState({currentUser: newName});
    const newNotification = {
      username: oldName,
      content: `User "${oldName}" has changed name to "${newName}"`,
      type:'post-notification'
    };
    this.socket.send(JSON.stringify(newNotification));
  };

  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
          console.log('Connected to WebSocket');
    };

    this.socket.onmessage = (serverData) => {
      const json = JSON.parse(serverData.data);
      console.log("font colour:",json.fontColour);

      switch (json.type) {
              case 'post-message':
              case 'post-notification':
                this.setState({
                  messages: [...this.state.messages, json]
                });
                break;
              case 'initial-messages':
                this.setState({
                  messages: json.messages,
                  currentUser: json.currentUser,
                  fontColour: json.fontColour
                });
                break;
              case 'update-userCount':
                this.setState({ numUser: json.userCount});
                break;
              default:
                // show an error in the console if the message type is unknown
                throw new Error("Unknown event type " + json.type);
      }

    };
  };

  render() {
    return (
      <div>
        <Navbar numUser={this.state.numUser} />
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this._addMessage} addName={this._addName} />
      </div>
    );
  }
}
export default App;
