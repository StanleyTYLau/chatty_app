import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import "../styles/application.scss"

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser:"",
      messages:[] // messages coming from the server will be stored here as they arrive
    };
  }

  _addMessage = (contents) => {
    const newMessage = {username: this.state.currentUser, content: contents};

    this.socket.send(JSON.stringify(newMessage));
  };

  _addName = (newName) => {
    this.setState({currentUser: newName});
  };

  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
          console.log('Connected to WebSocket');
    };

    this.socket.onmessage = (serverData) => {
      console.log('Got message from server', serverData);
      const json = JSON.parse(serverData.data);

      switch (json.type) {
              case 'text-message':
                this.setState({
                  messages: [...this.state.messages, json]
                });
                break;
              case 'initial-messages':
                this.setState({ messages: json.messages });
                break;
              default:
      }

    };
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand"><i className="far fa-comment-alt"></i> Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this._addMessage} addName={this._addName}/>
      </div>
    );
  }
}
export default App;
